    $(document).ready(function() {
    
    // Initial array of movies
    var movies = ["Cat on a Hot Tin Roof", "Some Like It Hot", "No Country for Old Men", "The Sound of Music", "The King's Speech", "American Psycho"];

    // Function for displaying movie data
    function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        $("#movies-buttons").empty();

        // Looping through the array of movies
        for (var i = 0; i < movies.length; i++) {

          // Dynamicaly generating buttons for each movie in the array.
          var a = $("<button>");
          // Adding a class
          a.addClass("movie");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", movies[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(movies[i]);
          // Adding the button to the HTML
          $("#movies-buttons").append(a);
        }
      }

      // Function for handling button click events
      $("#add-movie").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();

        // This line will grab the text from the input box
        var movie = $("#movie-input").val().trim();

        // The movie from the textbox is then added to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();
    });

    //AJAX here
    //Event listener fo all button elements
    $("button").on("click", function() {

      // The "this" keyword refers to the button that was clicked
      var type = $(this).attr("data-name");

      // Constructing a URL to search Giphy for the movie
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        type + "&api_key=G8v1vUrDlf4vIJfkpOpYWbpTUChnq2YC=10";

      //AJAX GET request
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After the data comes back from the API
        .then(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;
  
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
  
              // Only taking action if the photo has an appropriate rating
              if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                
                // Creating a div with the class "item"
                var gifDiv = $("<div class='item'>");
  
                // Storing the result item's rating
                var rating = results[i].rating;
  
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);
  
                // Creating an image tag
                var personImage = $("<img>");
  
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                personImage.attr("src", results[i].images.fixed_height.url);
  
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(personImage);
  
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs-appear-here").prepend(gifDiv);
              }
            }
          });
      });

      //Pausing and animating GIFs
      $(".gif").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });