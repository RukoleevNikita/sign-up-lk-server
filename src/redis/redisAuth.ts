import redis from 'redis';
import { promisify } from 'util';

export const client = redis.createClient();

export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set).bind(client);

// exports = {
//   client,
//   getAsync,
//   setAsync: setAsync,
// };
