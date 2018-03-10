const express = require('express');
const router = express.Router ();

router.get('/', (req, res, next) => {

  res.status(200).json({
    message: 'Places were fetched'
  });
});

router.get('/:placeid', (req, res, next) => {

  res.status(200).json({
    message: 'Place by id',
  });

});

module.exports = router;