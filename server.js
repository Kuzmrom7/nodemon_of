require('dotenv').config();

const http = require('http');
const app = require('./app');
const logger = require('./logger/logger');

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port, () => {
  logger.debug("Server up and run on port: " + port);
});