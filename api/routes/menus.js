const express = require('express');
const router = express.Router ();

router.get('/', (req, res, next) => {

  res.status(200).json({
    message: 'Menu were fetched'
  });
});

router.get('/:menu_id', (req, res, next) => {

  res.status(200).json({
    message: 'Menu by id',
  });

});

module.exports = router;