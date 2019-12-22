'use strict'

const debug = require('debug')('nikoverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  const arg = process.argv.slice(2)

  if (arg[0] === '-y') {
    console.log('yes from args :o - continuing')
  } else {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your database, are you sure?'
      }
    ])

    if (!answer.setup) {
      return console.log('Nothig happened :)')
    }
  }

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

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
