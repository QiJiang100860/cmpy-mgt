var host = require('./host.cfg')
module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"prod"',
  BASE_API: `'${host.prod}'`
}
