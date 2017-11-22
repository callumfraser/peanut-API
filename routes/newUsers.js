'use strict';
const userModel = require('../models/user.model');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  let code = res.statusCode;
  userModel.find({})
  .then((users) => {
    res.json({
      code,
      users
    });
  })
  .catch((err) => {
    res.json({
      code,
      err
    });
  })

});

module.exports = router;
