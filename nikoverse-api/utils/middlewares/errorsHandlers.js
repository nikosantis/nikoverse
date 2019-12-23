'use strict'

const debug = require('debug')('nikoverse:api:error')
const chalk = require('chalk')

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

function withErrorStack (err, stack) {
  return { ...err, stack }
}

function logError (err, req, res, next) {
  debug(err.stack)
  next(err)
}

function errorHandler (err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err

  res.status(statusCode)
  res.render(`${chalk.red('[error]')} ${withErrorStack(payload, err.stack)}`)
}

module.exports = {
  handleFatalError,
  logError,
  errorHandler
}
