'use strict'

const agentFixture = require('./agent')

const metric = {
  id: 1,
  agentId: agentFixture.single.id,
  type: 'memory',
  value: '300',
  createdAt: new Date(),
  updatedAt: new Date()
}

const metrics = [
  metric,
  { ...metric, id: 2, agentId: 1, type: 'cpu', value: '600' },
  { ...metric, id: 3, agentId: 2, type: 'memory', value: '200' },
  { ...metric, id: 4, agentId: 2, type: 'cpu', value: '1000' },
  { ...metric, id: 5, agentId: 2, type: 'gpu', value: '800' },
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: metric,
  all: metrics,
  byUuid: uuid => {
    const type = metrics.filter(a => a.agentId === agentFixture.byUuid(uuid).id).map(item => item.type)
    return type.filter((elem, pos) => type.indexOf(elem) === pos)
  },
  byTypeUuid: (type, uuid) => metrics.filter(a => a.type === type && a.agentId === agentFixture.byUuid(uuid).id)
}
