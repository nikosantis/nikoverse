'use strict'

const { Line, mixins } = require('vue-chartjs')
const { reactiveProp } = mixins

module.exports = {
  extends: Line,
  props: [ 'options' ],
  mixins: [reactiveProp],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
