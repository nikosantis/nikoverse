# nikoverse-db

## Usage

``` js
const setupDatabase = require('nikoverse-db')

setupDatabase(config).then(db => {
  const { Agent, Metric } = db
}).catch(err => console.error(err))
```