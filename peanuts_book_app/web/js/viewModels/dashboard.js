define(['ojs/ojcore', 'knockout', 'jquery', 'ais', 'ds', 'jet-composites/filter-table/loader'],
  function(oj, ko, $, ais, ds) {

    function Book(author, title, genre, about, image, recommendations) {
      this.author = author;
      this.title = title;
      this.genre = genre;
      this.about = about;
      this.image = image;
      this.recommendations = recommendations;
    }

    function DashboardViewModel() {
      var self = this;
      // check ds is initialized
      self.books = ko.observable([]);
      // for web component pattern
      // data service delivers for filter-table component --- data prop requirements

      self.formDetails = ko.observable([]);
      self.query = ko.observable();
      
      $.getJSON("http://peanut-library-api.herokuapp.com/api/v1/books", (allData) => {
        let allBooks = allData.books;
        var mappedTasks = $.map(allBooks, (book) => {
          return new Book(book.author, book.bookName, book.genre, book.about, book.image, book.recommendations);
        });
        self.books(mappedTasks);
      });
      
      self.addBook = function () {
        let obj = {
          author: $('.author').val(),
          bookName: $('.book').val(),
          genre: $('.genre').val(),
          dateWritten: $('.date').val(),
          about: $('.about').val(),
          image: $('.img').val()
        }
        $.ajax("http://peanut-library-api.herokuapp.com/api/v1/books", {
          data: JSON.stringify(obj),
          type: "post", contentType: "application/json",
          success: function (result) {
            alert("new book succesfully added")
            location.reload();
          }
        });
      };

      self.searchBooks = ko.computed(function () {
        if (self.query()) {
          return self.books().filter(book => book.title.toLowerCase().includes(self.query().toLowerCase()));
        }

        return self.books();
      });

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

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  });
