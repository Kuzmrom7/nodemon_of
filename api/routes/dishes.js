const express = require('express');
const router = express.Router ();

router.get('/', (req, res, next) => {

  res.status(200).json({
    message: 'Dish were fetched'
  });
});

router.get('/:id_dish', (req, res, next) => {

  res.status(200).json({
    message: 'Dish by id',
  });

});

module.exports = router;