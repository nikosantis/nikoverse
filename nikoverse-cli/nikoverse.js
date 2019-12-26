#!/usr/bin/env node

'use strict'

const args = require('args')

args
  .option('port', 'The port on which the app will be running', 3000)
  .option('reload', 'Enable/disable livereloading')
  .command('serve', 'Serve your static site', ['s'])

const flags = args.parse(process.argv)
