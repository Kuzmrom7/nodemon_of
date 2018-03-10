const express = require('express');
const router = express.Router ();

router.get('/', (req, res, next) => {

  res.status(200).json({
    message: 'Orders were fetched'
  });
});

router.get('/', (req, res, next) => {

  res.status(200).json({
    message: 'Order by id',
  });

});

module.exports = router;