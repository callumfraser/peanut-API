'use strict';
const bookModel = require('../models/book.model');
const express = require('express');
const router = express.Router();


router.put('/borrow/:book_id/:user_id', (req, res) => {
    let code = res.statusCode;
    var bookId = req.params.book_id;
    var userId = req.params.user_id;

    bookModel.findOneAndUpdate({
      "id":bookId
    }, {
     $inc : {
       timesTaken : 1
     },
     availability: false,
     currentUser : userId
   }, {
     upsert : true
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
