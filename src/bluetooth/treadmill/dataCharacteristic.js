const util = require('util')
const bleno = require('bleno')

function TreadmillDataCharacteristic () {
  TreadmillDataCharacteristic.super_.call(this, {
    uuid: '2ACD',
    properties: ['notify'],
    value: null,
    descriptors: []
  })
}

util.inherits(TreadmillDataCharacteristic, bleno.Characteristic)

module.exports = TreadmillDataCharacteristic
