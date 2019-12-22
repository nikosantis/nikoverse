# nikoverse-agent

## Usage

```js
const NikoverseAgent = require('nikoverse-agent')

const agent = new NikoverseAgent({
  name: 'myapp',
  username: 'admin',
  interval: 2000
})

agent.addMetric('rss', function getRss () {
  return process.memoryUsage().rss
})

agent.addMetric('promiseMetric', function getRandomPromise () {
  return Promise.resolve(Math.random())
})

agent.addMetric('callbackMetric', function getRandomCallback () {
  setTimeout(() => {
    callback(null, Math.random())
  }, 1000)
})

agent.connect()

// This agent only
agent.on('connected', handler)
agent.on('disconnected', handler)
agent.on('message', handler)

agent.on('agent/connected', handler)
agent.on('agent/disconnected', handler)
agent.on('agent/message', payload => {
  console.log(payload)
})

setTimeout(() => agent.disconnect(), 20000)
```
