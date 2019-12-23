'use strict'

const agentFixtures = require('./agent')

const metric = {
  id: 1,
  agent: agentFixtures.findByUuid('yyy-yyy-yyy'),
  type: 'memory',
  value: '300',
  createdAt: new Date(),
  updatedAt: new Date()
}

const metrics = [
  metric,
  { ...metric, id: 2, type: 'cpu', value: '600' },
  { ...metric, id: 3, type: 'memory', value: '200' },
  { ...metric, id: 4, agent: agentFixtures.findByUuid('yyy-yyy-yyw'), type: 'cpu', value: '1000' },
  { ...metric, id: 5, agent: agentFixtures.findByUuid('yyy-yyy-yyx'), type: 'gpu', value: '800' }
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: metric,
  all: metrics,
  findByAgentUuid: uuid => {
    const type = metrics.filter(a => a.agent.uuid === uuid).map(item => item.type)
    return type.filter((elem, pos) => type.indexOf(elem) === pos)
  },
  findByTypeAgentUuid: (type, uuid) => metrics.filter(a => a.agent.uuid === uuid && a.type === type )
}
