var host = require('./host.cfg')
module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"sit"',
  BASE_API: `'${host.sit}'`
}