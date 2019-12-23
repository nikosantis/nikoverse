'use strict'

const debug = require('debug')('nikoverse:api:db')

module.exports = {
  db: {
    database: process.env.DB_NAME || 'nikoverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'secret',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s)
  }
}
