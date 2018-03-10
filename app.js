const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./logger/logger');


mongoose.connect('mongodb://localhost:27017/orderfood', () => {
  logger.debug("Database connect!")
});

const menusRoutes = require('./api/routes/menus');
const ordersRoutes = require('./api/routes/orders');
const placesRoutes = require('./api/routes/places');
const dishesRoutes = require('./api/routes/orders');
const addressRoutes = require('./api/routes/addresses');

app.use(require('morgan')({ "stream": logger.stream }));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));


app.use('/order',ordersRoutes);
app.use('/menu', menusRoutes);
app.use('/places', placesRoutes);
app.use('/dishes', dishesRoutes);
app.use('/address', addressRoutes);


module.exports = app;