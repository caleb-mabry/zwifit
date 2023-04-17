#!/usr/bin/env node
const oneTime = require('./src/oneTimeSetup')

oneTime.setup(() => {
  const ifit = require('./src/ifit')
  const api = require('./src/api')
  const bluetooth = require('./src/bluetooth')
  const onDeath = require('death')

  /*
	 Initialization.
	 */
  api.start()
  bluetooth.start()
  ifit.connect()
  onDeath(cleanUp)

  /*
	 Implementation.
	 */
  function cleanUp () {
    console.log('Shutting down...')
    setTimeout(() => process.exit(0), 1000)
  }
})
