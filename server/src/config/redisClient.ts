import { createClient, RedisClientType } from "redis";

export class CacheClient {
  private static instance: CacheClient;
  private client: RedisClientType;

  private constructor() {
    this.client = createClient();
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    this.client.connect();
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
      return await this.client.exists(key) > 1;
    } catch (error) {
      console.log(`Error checking key in Redis: ${error}`);
      return false;
    }
  }

  public async set(key: string, value: string, ttl: number = 10 * 60): Promise<void> {
    try {
      // Determine the type of the value
      const valueType = typeof value;

      switch (valueType) {
        case "string":
        case "number":
          // Directly use set for string and number
          await this.client.setEx(key,ttl, value.toString());
          break;
        case "object":
          if (Array.isArray(value)) {
            for (const item of value) {
              await this.client.rPush(key, JSON.stringify(item));
            }
            await this.client.expire(key, ttl);
          } else {
            // Use hset for object
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
      console.log(`Error settignkey in Redis: ${error}`);
    }
  }

  public async get(key: string): Promise<any> {
    try {
      let type = "string"; // Default type is string
      // Check the type of the key
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
