require('dotenv').config();

const http = require('http');
const app = require('./app');
const logger = require('./logger/logger');
const socketIo = require("socket.io");

const port = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketIo(server);


io.on("connection",socket => {
  logger.debug("New client connected", )
});

require('./api/routes/orders')(io);


server.listen(port, () => {
  logger.debug("Server up and run on port: " + port);
});

module.exports.Io = io;
