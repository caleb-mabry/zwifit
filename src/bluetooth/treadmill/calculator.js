const utils = require('../../lib/utils')

exports.calculateBuffer = calculateBuffer

// console.log((calculateBuffer({
//  kph: 9.65,
//  hr: 180,
//  incline: 3
// }).toString('hex')));

function calculateBuffer (args) {
  const kph = args.kph
  const hr = args.hr
  const incline = args.incline

  const kilometersPerHour = kph
  const kilometersPerHourRounded = Math.round(kilometersPerHour * 100)
  const inclineRounded = Math.round(incline * 10)
  const degrees = incline ? (Math.atan(incline / 100) * 180 / Math.PI) : 0
  const degreesRounded = Math.round(degrees * 10)
  const flags = {
    InstantaneousSpeed: false,
    AverageSpeedPresent: false,
    TotalDistancePresent: false,
    InclinationAndRampAngleSettingPresent: true,
    ElevationGainPresent: false,
    InstantaneousPacePresent: false,
    AveragePacePresent: false,
    ExpendedEnergyPresent: false,
    HeartRatePresent: !!hr,
    MetabolicEquivalentPresent: false,
    ElapsedTimePresent: false,
    RemainingTimePresent: false,
    ForceOnBeltAndPowerOutputPresent: false,
    ReservedForFutureUse1: false,
    ReservedForFutureUse2: false,
    ReservedForFutureUse3: false
  }

  const buffer = utils
    .bufferHelper()
    .write(16, utils.convertFlags(flags))
    .write(16, kilometersPerHourRounded)
    .write(16, inclineRounded, true)
    .write(16, degreesRounded, true)

  if (hr) {
    buffer.write(8, hr)
  }

  return buffer.finish()
}
