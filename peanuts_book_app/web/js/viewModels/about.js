/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery'],
    function(oj, ko, $) {

      function Book(author, title, genre, about, image, _id) {
        this.author = author;
        this.title = title;
        this.genre = genre;
        this.about = about;
        this.image = image;
        this._id = _id;
      }

        function AboutViewModel() {
            var self = this;

            self.outstandingBooksArr = ko.observable([]);
            self.books = ko.observable([]);
            self.query = ko.observable();

            self.searchBooks = ko.computed(function () {
              if (self.query()) {
                return self.books().filter(book => book.title.toLowerCase().includes(self.query().toLowerCase()));
              }

              return self.books();
            });

            self.addMember = function() {
                var data = {
                    firstName: $('.firstName').val(),
                    lastName: $('.lastName').val()
                }

                $.ajax('http://peanut-library-api.herokuapp.com/api/v1/register',{
                    data: JSON.stringify(data),
                    type: "post", contentType: "application/json",
                    success: function(result) {
                      alert("memberId : " + result.user._id)
                      location.reload();
                    }
                });
            }

            self.searchMember = function() {
              let userId = $('.memberReturnId').val();
              $.getJSON("http://peanut-library-api.herokuapp.com/api/v1/books/userBooks/" + userId, (data) => {
                let userBooks = data.books;
                var mappedTasks = $.map(userBooks, (book) => {
                  return new Book(book.author, book.bookName, book.genre, book.about, book.image, book._id);
                });
                self.outstandingBooksArr(mappedTasks);
              });
            }

            let bookId = null;
            self.returnBook = (evt) => {
              bookId = evt._id;
            }

            self.searchToLoan = () => {
              let memberId = $('#loanerId').val();
              $.getJSON("http://peanut-library-api.herokuapp.com/api/v1/users", (data) => {
                console.log(data.users);
                var mappedTasks = $.map(data.users, (member) => {
                  if (memberId == member._id) {
                    $.getJSON("http://peanut-library-api.herokuapp.com/api/v1/books", (allData) => {
                      let allBooks = allData.books;
                      var mappedTasks = $.map(allBooks, (book) => {
                        return new Book(book.author, book.bookName, book.genre, book.about, book.image, book._id);
                      });
                      self.books(mappedTasks);
                    });
                  }
                });
              });
            }

            self.loanBook = (evt) => {
              let bookId = evt._id;
              console.log(evt);
              let userId = $('#loanerId').val();
              console.log(bookId, userId)
              $.ajax('http://peanut-library-api.herokuapp.com/api/v1/books/borrow/' + bookId + "/" + userId, {
                type: "put", contentType: "application/json",
                success: function (result) {
                  alert("memberId : " + userId + " borrowed book : " + evt.title);
                  location.reload();
                }
              });
            }

            self.recommend = (evt) => {
              let userId = $('.memberReturnId').val();
              $.ajax('http://peanut-library-api.herokuapp.com/api/v1/books/return/' + bookId + "/" + userId + "/true", {
                type: "put", contentType: "application/json",
                success: function (result) {
                  alert("memberId : book returned")
                  location.reload();
                }
              });
            }

            self.dontRecommend = () => {
              let userId = $('.memberReturnId').val();
              $.ajax('http://peanut-library-api.herokuapp.com/api/v1/books/return/' + bookId + "/" + userId + "/false", {
                type: "put", contentType: "application/json",
                success: function (result) {
                  alert("memberId : book returned")
                  location.reload();
                }
              });
            }

            self.handleActivated = function(info) {
                // Implement if needed
            };

            self.handleAttached = function(info) {
                // Implement if needed
            };

            self.handleBindingsApplied = function(info) {
                // Implement if needed
            };

            self.handleDetached = function(info) {
                // Implement if needed
            };
        }

        return new AboutViewModel();
    }
);
