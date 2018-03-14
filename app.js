const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./logger/logger');

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/orderfood`, () => {
  logger.debug("Database connect!")
});

const {router} = require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));


app.use('/order',router);



module.exports = app;