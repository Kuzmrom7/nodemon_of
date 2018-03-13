const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const logger = require('../../logger/logger');
const {Io} = require('../../server');
// const socket = server.socket;

const Order = require('../models/order');

router.get('/', (req, res, next) => {

  res.status(200).json({
    message: 'Orders were fetched'
  });
});

module.exports =  function(io) {
  router.post('/', (req, res, next) => {

    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      id_place: req.body.id_place,
      id_address: req.body.id_address,
      name_user: req.body.name_user,
      phone: req.body.phone,
      dishes: req.body.dishes,
      total: req.body.total
    });

    order.save()
      .then((result) => {
        res.status(200).json({
          message: "Order create success",
          order: result._id,
          request: {
            type: 'GET',
            url: `http://${process.env.API_HOST}:${process.env.PORT}/order/${result._id}`
          }
        })
      })
      .then(() => {
        try {
          io.emit(order.id_place, order)
        }
        catch (error) {
          logger.error("Error", error)
        }

      })
      .catch((err) => logger.error("Error", err));

  });
};

module.exports.router = router;
