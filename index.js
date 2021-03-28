const { node: version } = require('./package.json').engines;
const { satisfies } = require('semver');

/**
 * Handler Function validate params
 * Minimum node version = 10
 */

if (!satisfies(process.version, version)) {
  console.log(`Required node version ${version} not satisfied with current version ${process.version}.`);
  process.exit(1);
}

const HandledFunction = require('./handler');

module.exports = HandledFunction;
