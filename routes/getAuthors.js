'use strict';
const authorModel = require('../models/author.model');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let code = res.statusCode;
    authorModel.find({})
        .then((authors) => {
            res.json({
                code,
                authors
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
