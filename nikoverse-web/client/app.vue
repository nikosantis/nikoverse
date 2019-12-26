<template>
  <div>
    <metric
      uuid="63af1c0e-0d75-4f53-ac16-d22eed2fec34"
      type="callbackMetric"
      :socket="socket"></metric>
    <agent
      v-for="agent in agents"
      :uuid="agent.uuid"
      :key="agent.uuid">
    </agent>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<style>
  body {
    font-family: Arial;
    background: #f8f8f8;
    margin: 0;
  }
</style>

<script>
  const io = require('socket.io-client')
  const socket = io()

  module.exports = {
    data () {
      return {
        agents: [],
        error: null,
        socket
      }
    },
    mounted () {
      this.initialize()
    },
    methods: {
      initialize () {
      }
    }
  }
</script>
