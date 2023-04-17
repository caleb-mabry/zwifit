const util = require('util')
const bleno = require('bleno')

function RSCMeasurementCharacteristic () {
  RSCMeasurementCharacteristic.super_.call(this, {
    uuid: '2A53',
    properties: ['notify'],
    value: null,
    descriptors: []
  })
}

util.inherits(RSCMeasurementCharacteristic, bleno.Characteristic)

module.exports = RSCMeasurementCharacteristic
