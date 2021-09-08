const bluebird = require('bluebird');
const redis = require('redis');

// So we can use await on client (add getAsync method)
bluebird.promisifyAll(redis.RedisClient.prototype);
const redisClient = redis.createClient(process.env.REDIS_PORT);
module.exports = redisClient;
