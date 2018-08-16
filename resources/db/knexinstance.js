const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../../knexfile.js')[environment];

module.exports = require('knex')(knexConfig);
