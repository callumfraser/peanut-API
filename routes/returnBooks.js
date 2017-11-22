'use strict';
const bookModel = require('../models/book.model');
const express = require('express');
const router = express.Router();


router.put('/:_id', (req, res) => {
    let code = res.statusCode;
    var bookReturned = req.body;
    var bookId = req.params.id;
    var recommendationCheck = 0;

    if (bookReturned.recommendation == true){
      recommendationCheck = 1;
    }

    console.log(recommendationCheck);

    console.log(bookReturned);

    bookModel.findOneAndUpdate({
      "id":bookId
    }, {
     $inc : {
       recommendations : (0 + recommendationCheck)
     },
     availability: true,
     currentUser : "None"
   }, {
     upsert : false
   }, function(err,result){
     if (err){
       return res.json({
         status : 'error',
         error : err,
         taken : []
       })
     } else {
       res.json({
         status : "success",
         taken : result
       })
     }
   })

});

module.exports = router;
