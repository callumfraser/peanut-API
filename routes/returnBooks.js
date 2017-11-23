'use strict';
const bookModel = require('../models/book.model');
const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');



router.put('/return/:book_id/:user_id/:recommended', (req, res) => {
    let code = res.statusCode;
    var recommendedOrNot = req.params.recommended;
    var bookId = req.params.book_id;
    var recommendationCheck = 0;
    var userId = req.params.user_id;

    if (recommendedOrNot == 'true'){
      recommendationCheck = 1;
    }

    console.log(recommendationCheck);



    bookModel.findOneAndUpdate({
      "_id": bookId
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
       console.log(result.bookName);
       userModel.findOneAndUpdate({
         "_id": userId
       }, {
         $push: {
             booksRead: result.bookName
         }
       }, function(err,userResult){
         if (err){
           console.log(userResult)
           return res.json({
             status : 'error',
             error : err,
             taken : []
           })
         }
       })

     }
   })

});

module.exports = router;
