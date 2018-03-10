const express = require('express');
const router = express.Router ();

router.get('/', (req, res, next) => {

  res.status(200).json({
    message: 'Address were fetched'
  });
});

router.get('/:id_dish', (req, res, next) => {

  res.status(200).json({
    message: 'Address by id',
  });

});

module.exports = router;