'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const request = require('request-promise-native')

const { endpoint, apiToken } = require('./config')
const api = asyncify(express.Router())

api.get('/agents', async (req, res, next) => {
  const options = {
    method: 'GET',
    url: `${endopint}/api/agents`,
    headers: {
      'Authorization': `Bearer ${apiToken}`
    },
    json: true
  }

  let result
  try {
    result = await request(options)
  } catch (e) {
    return next(e)
  }

  res.send(result)
})

api.get('/agent/:uuid', (req, res) => {})

api.get('/metrics/:uuid', (req, res) => {})

api.get('/metrics/:uuid/:type', (req, res) => {})

module.exports = api
