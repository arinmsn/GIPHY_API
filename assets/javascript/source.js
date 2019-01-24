$(window).ready(function() {
    var topics = [
        "Home Alone",
        "Alice in Wonderland",
        "Lord of the Rings",
        "Star Wars",
        "Hobbit",
        "Harry Potter", 
        "Toy Story"
    ];

    // This function will take care of dynamically generating buttons.
    function generateButtons() {
        
        // To avoid having repeated buttons.
        // Adding new movie buttons.
        $("#movies-buttons").empty();
        
        for (i=0; i < topics.length; i++){

            // Buttons for each item in array will be generated. <button>...</button>
            var a = $("<button>");
            a.addClass("btn btn-primary");
            a.addClass("movie");
            
            // We apply the attribute data-name='...' to each item in the array.
            a.attr("data-name", topics[i]);

            a.text(topics[i]);
            $("#movies-buttons").append(a);
        }
    }

    function generateNewButton(){
        // When search button is pressed ...
        $("#searchButton").on("click", function(event) {
            
            event.preventDefault();
            
            var movie = $("#search-box").val().trim();
            
            // // In case user doesn't enter anything
            // if (movie == "") {                            <--- Let's add this functionality later.
            //     return false;
            // }
            
            topics.push(movie);
            console.log("Button that was just created: " + movie);
            console.log(topics);
            
            generateButtons();
            return false;
        });
    }

    generateButtons();
    console.log(topics);
    generateNewButton(); // If this is missing, entering keyword in <search box> won't generate a new button
            

    // User clicks on one of the <keys> on the screen 
    // Populate 10x GIFS: random, q: random, and 

    // $("<button>").on("click", function(e) {
    // if (document.getElementsByClassName == "movie" && document.querySelectorAll('[data-name]') == "Harry Postter") {
    //     console.log("Accio! Accio! Accio!");
    //     console.log("It didn't work. You are supposed to look at object near you before summoning it!");
    // }


    // function showGifs() {   
    //           }



    function showGifs() { 

        var gifName = $(this).attr("data-name");
        console.log(this);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=eMyvfzpHKUO6Vzs4y2ZR5hTOnLM0C84Y&limit=10";
        
        console.log(queryURL); //    ****** TESTING
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then (function(response) {
            var results = response.data;

            for (j=0; j < results.length; j++) {
                
                if (results[j].rating !== "r" && results[j].rating !== "pg-13") {
                    var gifDiv = $("<div>");
                    var rating = results[j].rating;
                    var gifRating = $("<p>").text("Rating: " + rating);
                    
                    var movieImage = $("<img>");

                    movieImage.attr("src", results[j].images.fixed_height_still.url); 
                    // movieImage.attr("data-still", results[j].images.fixed_height_still.url);
                    // movieImage.addClass("image");

                    gifDiv.append("<p>");
                    $("#gifsGoHere").prepend(movieImage);
                }
            }
        });
    }

    showGifs();
});