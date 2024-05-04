// // redisClient.ts
// import { createClient, RedisClient } from 'redis';
// import { promisify } from 'util';

// const client: RedisClient = createClient();

// client.on('error', (err) => {
//     console.error('Redis client error:', err);
// });

// export const getAsync = promisify(client.get).bind(client);
// export const setAsync = promisify(client.set).bind(client);
