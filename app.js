const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./logger/logger');





//mongoose.connect('mongodb://localhost:27017/orderfood');

/*const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');*/

logger.info('Express server listening on port ');
app.use(require('morgan')({ "stream": logger.stream }));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));


module.exports = app;