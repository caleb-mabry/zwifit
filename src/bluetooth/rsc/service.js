const util = require('util')
const bleno = require('bleno')
const constants = require('../../constants')

function RSCService () {
  this.measurement = new (require('./measurementCharacteristic'))()

  RSCService.super_.call(this, {
    name: constants.NAME,
    uuid: '1814',
    characteristics: [
      this.measurement,
      new (require('./featureCharacteristic'))()
    ]
  })
}

util.inherits(RSCService, bleno.PrimaryService)

module.exports = RSCService
