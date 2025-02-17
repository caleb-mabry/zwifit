const utils = require('../../lib/utils')

const secondsPerHour = 3600
// let secondsPerMinute = 60;

exports.calculateBuffer = calculateBuffer

// console.log(calculateBuffer({ kph: 9.65, cadence: 172 }).toString('hex'));

function calculateBuffer (args) {
  const kph = args.kph
  const cadence = args.cadence

  const metersPerSecond = kph ? kph * 1000 / secondsPerHour : 0
  // metersPerMinute = metersPerSecond * secondsPerMinute,
  const metersPerSecondRounded = Math.round(metersPerSecond * 256)
  const stepsPerMinute = Math.round(cadence)
  // metersPerStep = (metersPerMinute && stepsPerMinute) ? metersPerMinute / stepsPerMinute : 0,
  // metersPerStepRounded = Math.round(metersPerStep * 100),
  const flags = {
    InstantaneousStrideLengthPresent: false,
    TotalDistancePresent: false,
    WalkingOrRunningStatusBits: kph >= 8,
    ReservedForFutureUse1: false,
    ReservedForFutureUse2: false,
    ReservedForFutureUse3: false,
    ReservedForFutureUse4: false,
    ReservedForFutureUse5: false
  }

  return utils
    .bufferHelper()
    .write(8, utils.convertFlags(flags))
    .write(16, metersPerSecondRounded)
    .write(8, stepsPerMinute)
  // .write(16, metersPerStepRounded)
    .finish()
}
