'use strict'

const debug = require('debug')('nikoverse:db:setup')
const db = require('./')

async function setup () {

  const config = {
    database: process.env.DB_NAME || 'nikoverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'secret',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }
  
  await db(config)
    .catch(handleFatalError)
}

function handleFatalError () {
  
}

setup()
