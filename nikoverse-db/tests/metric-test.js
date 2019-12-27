'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const metricFixtures = require('./fixtures/metric')
const agentFixtures = require('./fixtures/agent')

const config = {
  logging () {}
}

const AgentStub = {
  hasMany: sinon.spy()
}

const uuid = 'yyy-yyy-yyy'
const type = 'memory'
let db = null
let sandbox = null
let MetricStub = null

const uuidArgs = {
  where: { uuid }
}

const newMetric = {
  type: 'parlantes',
  value: '900'
}

const findAllUuidMetric = {
  attributes: ['type'],
  group: ['type'],
  include: [{
    attributes: [],
    model: AgentStub,
    where: {
      uuid
    }
  }],
  raw: true
}

const findAllUuidTypeMetric = {
  attributes: ['id', 'type', 'value', 'createdAt'],
  where: {
    type
  },
  limit: 20,
  order: [['createdAt', 'DESC']],
  include: [{
    attributes: [],
    model: AgentStub,
    where: {
      uuid
    }
  }],
  raw: true
}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  MetricStub = {
    belongsTo: sandbox.spy()
  }

  // Model create Stub
  MetricStub.create = sandbox.stub()
  MetricStub.create.withArgs(newMetric).returns(Promise.resolve({
    toJSON () { return newMetric }
  }))

  // Model all Stub
  MetricStub.findAll = sandbox.stub()
  MetricStub.findAll.withArgs(findAllUuidMetric).returns(Promise.resolve(
    metricFixtures.byUuid(uuid)
  ))
  MetricStub.findAll.withArgs(findAllUuidTypeMetric).returns(Promise.resolve(
    metricFixtures.byTypeUuid(type, uuid)
  ))

  // Model findOne Stub
  AgentStub.findOne = sandbox.stub()
  AgentStub.findOne.withArgs(uuidArgs).returns(Promise.resolve(
    agentFixtures.byUuid(uuid)
  ))

  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub
  })

  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sinon.resetHistory()
})

test('Metric', t => {
  t.truthy(db.Metric, 'Metric service should exists')
})

test.serial('setup', t => {
  t.true(AgentStub.hasMany.called, 'hasMany was executed')
  t.true(AgentStub.hasMany.calledOnce, 'hasMany was executed once')
  t.true(AgentStub.hasMany.calledWith(MetricStub), 'Argument should be the MetricModel')
  t.true(MetricStub.belongsTo.called, 'belongsTo was executed')
  t.true(MetricStub.belongsTo.calledOnce, 'belongsTo was executed once')
  t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argument should be the AgentStub')
})

test.serial('Metric#create', async t => {
  const metric = await db.Metric.create(uuid, newMetric)

  t.true(AgentStub.findOne.called, 'findOne should be called on model')
  t.true(AgentStub.findOne.calledOnce, 'findOne should be called once')
  t.true(AgentStub.findOne.calledWith(uuidArgs), 'findOne should be called with specified uuid Args')
  t.true(MetricStub.create.called, 'create should be called on model')
  t.true(MetricStub.create.calledOnce, 'create should be called once')
  t.true(MetricStub.create.calledWith(newMetric), 'create should be called with specified newMetric Args')

  t.deepEqual(metric, newMetric, 'metric should be the same')
})

test.serial('Metric#findByAgentUuid', async t => {
  const metric = await db.Metric.findByAgentUuid(uuid)

  t.true(MetricStub.findAll.called, 'findAll should be called on model')
  t.true(MetricStub.findAll.calledOnce, 'findAll should be called once')
  t.true(MetricStub.findAll.calledWith(findAllUuidMetric), 'findAll should be called with specified')

  t.deepEqual(metric, metricFixtures.byUuid(uuid))
})

test.serial('Metric#findByTypeAgentUuid', async t => {
  const metric = await db.Metric.findByTypeAgentUuid(type, uuid)

  t.true(MetricStub.findAll.called, 'findAll should be called on model')
  t.true(MetricStub.findAll.calledOnce, 'findAll should be called once')
  t.true(MetricStub.findAll.calledWith(findAllUuidTypeMetric), 'findAll should be called with specified')

  t.deepEqual(metric, metricFixtures.byTypeUuid(type, uuid))
})
