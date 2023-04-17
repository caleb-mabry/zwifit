const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

/*
 Public API.
 */
exports.version = 1
exports.list = []

exports.load = load
exports.toJSON = toJSON
exports.fromJSON = fromJSON
exports.save = save

/*
 Initialization.
 */
const minimumVersion = 1
const ref = path.join(__dirname, '..', 'routes.conf')

/*
 Implementation.
 */

function load () {
  if (!fs.existsSync(ref)) {
    return false
  }
  try {
    let routes = yaml.safeLoad(fs.readFileSync(ref, 'UTF-8'))
    if (routes) {
      if (routes.version && routes.version < minimumVersion) {
        console.log('New routes have been added!')
        routes = null
      } else {
        fromJSON(routes)
      }
    }
    return !!routes
  } catch (err) {
    return false
  }
}

function toJSON () {
  const settings = {}
  for (const key in exports) {
    if (Object.prototype.hasOwnProperty.call(exports, key) && typeof exports[key] !== 'function') {
      settings[key] = exports[key]
    }
  }
  return settings
}

function fromJSON (json) {
  for (const key in json) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      exports[key] = json[key]
    }
  }
}

function save () {
  fs.writeFile(ref, yaml.safeDump(toJSON()), 'UTF-8', () => {})
}
