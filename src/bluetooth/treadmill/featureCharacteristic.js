const util = require('util')
const bleno = require('bleno')

// 16-bit feature flags
const feature = Buffer.from('0000000000000000', 'binary')

function TreadmillFeatureCharacteristic () {
  TreadmillFeatureCharacteristic.super_.call(this, {
    uuid: '2ACC',
    properties: ['read'],
    value: feature,
    descriptors: []
  })
}

util.inherits(TreadmillFeatureCharacteristic, bleno.Characteristic)

TreadmillFeatureCharacteristic.prototype.onReadRequest = function (offset, callback) {
  let result = this.RESULT_SUCCESS
  let data = feature
  if (offset > data.length) {
    result = this.RESULT_INVALID_OFFSET
    data = null
  }
  callback(result, data)
}

module.exports = TreadmillFeatureCharacteristic
