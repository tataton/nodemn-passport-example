const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient();
const redisStore = new RedisStore({ client: redisClient });

module.exports = redisStore;
