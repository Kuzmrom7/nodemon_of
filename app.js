const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./logger/logger');
const passport = require('passport');

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/orderfood`, () => {
  logger.debug("Database connect!")
});

const {router} = require('./api/routes/orders');
const auth = require('./api/routes/users');

app.use(morgan('dev'));
app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));


app.use('/auth', auth);
app.use('/order',router);



module.exports = app;