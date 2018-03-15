const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const logger = require('../../logger/logger');


const Order = require('../models/order');


// METHOD GET ORDERS FOR PLACE

router.get('/place/:id_place', (req, res, next) => {

  Order.find({id_place: req.params.id_place})
    .exec()
    .then((result) => {
      res.status(200).json(result)
    });

});

// METHOD GET ORDERS FOR ADDRESS

router.get('/address/:id_address', (req, res, next) => {

  Order.find({id_address: req.params.id_address})
    .exec()
    .then((result) => {
      res.status(200).json(result)
    });

});


// METHOD GET ORDERS FOR ORDER_ID

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Order.findById(id)

    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
});


//CREATE ORDER AND CONNECT TO WSS

module.exports = function (io) {
  router.post('/', (req, res, next) => {

    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      date: req.body.date,
      id_place: req.body.id_place,
      id_address: req.body.id_address,
      name_user: req.body.name_user,
      phone: req.body.phone,
      dishes: req.body.dishes,
      status: req.body.status,
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
