# nikoverse-agent

## Usage

```js
const NikoverseAgent = require('nikoverse-agent')

const agent = new NikoverseAgent({
  interval: 2000
})

agent.connect()

agent.on('agent/message', payload => {
  console.log(payload)
})

setTimeout(() => agent.disconnect(), 20000)
```
