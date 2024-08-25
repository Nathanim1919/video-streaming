import { createClient, RedisClientType } from "redis";

export class CacheClient {
  private static instance: CacheClient;
  private client: RedisClientType;

  // private constructor() {
  //   this.client = createClient({
  //     password: process.env.REDIS_PASSWORD || 'ltN3huYP4jrHDTqr07dNUTsxChnsFjZZ',
  //     socket: {
  //       host: process.env.REDIS_HOST || 'redis-11532.c12.us-east-1-4.ec2.redns.redis-cloud.com',
  //       port: parseInt(process.env.REDIS_PORT) || 11532,
  //       reconnectStrategy: (retries) => {
  //         if (retries > 10) {
  //           return new Error('Retry attempts exhausted');
  //         }
  //         return Math.min(retries * 50, 2000); // Exponential backoff
  //       }
  //     }
  //   });
  //   this.connectClient();
  // }

  // redis connection with local redis
    private constructor() {
        this.client = createClient();
        this.connectClient();
    }

  private async connectClient() {
    console.log('Connecting...');
    try {
      await this.client.connect();
      console.log('Connected to Redis');
      this.client.on('error', (err) => {
        console.log('Redis Client Error', err);
        if (err.code === 'ETIMEDOUT') {
          console.log('Retrying connection...');
          this.connectClient();
        }
      });
    } catch (error) {
      console.log('Failed to connect to Redis:', error);
    }
  }

  public static getInstance(): CacheClient {
    if (!CacheClient.instance) {
      CacheClient.instance = new CacheClient();
    }

    return CacheClient.instance;
  }

  public getClient(): RedisClientType {
    return this.client;
  }

  public async exists(key: string): Promise<boolean> {
    try {
      return await this.client.exists(key) > 0;
    } catch (error) {
      console.log(`Error checking key in Redis: ${error}`);
      return false;
    }
  }

  public async set(key: string, value: string, ttl: number = 60): Promise<void> {
    try {
      const valueType = typeof value;

      switch (valueType) {
        case "string":
        case "number":
          await this.client.setEx(key, ttl, value.toString());
          break;
        case "object":
          if (Array.isArray(value)) {
            for (const item of value) {
              await this.client.rPush(key, JSON.stringify(item));
            }
            await this.client.expire(key, ttl);
          } else {
            for (const [field, fieldValue] of Object.entries(value)) {
              await this.client.hSet(key, field, JSON.stringify(fieldValue));
            }
            await this.client.expire(key, ttl);
          }
          break;
        default:
          console.log("Unsupported value type");
      }
    } catch (error) {
      console.log(`Error setting key in Redis: ${error}`);
    }
  }

  public async get(key: string): Promise<any> {
    try {
      let type = "string";
      if (key.startsWith("obj:")) {
        type = "object";
      } else if (key.startsWith("list:")) {
        type = "list";
      }

      switch (type) {
        case "string":
          return await this.client.get(key);
        case "object":
          const objectValues = await this.client.hGetAll(key);
          return Object.fromEntries(
              Object.entries(objectValues).map(([field, fieldValue]) => [
                field,
                JSON.parse(fieldValue),
              ])
          );
        case "list":
          const listLength = await this.client.lLen(key);
          const listValue = await this.client.lRange(key, 0, listLength - 1);
          return listValue.map((value) => JSON.parse(value));
        default:
          console.log("Unsupported key type");
          return null;
      }
    } catch (error) {
      console.log(`Error getting key in Redis: ${error}`);
      return null;
    }
  }

  public async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.log(`Error deleting key in Redis: ${error}`);
    }
  }
}
