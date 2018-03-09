const nconf = require('nconf');
const path = require('path');

const config = require('./config');

nconf.argv()
  .env()
  .file({ file: path.join(__dirname, 'config.json') });

module.exports = nconf;