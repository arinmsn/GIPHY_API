var topics = [
    "Home Alone",
    "Alice in Wonderland",
    "Lord of the Rings",
    "Star Wars",
    "Hobbit",
    "Harry Potter",
    "Toy Story"
];

var searchBoxText = "";                       // ---------------------
var gifImage = "";
var gifsAreFull = false;
var gifRating = "";

// Add user to topics array                 // ---------------------
function addUserText() {
    topics.push(searchBoxText);
}

// Clear typed text in the search box       // ---------------------
function clearSearchBox() {
    searchBoxText = "";
    $("#search-box").val("");
}

// This function will take care of dynamically generating buttons.
function generateButtons() {

    // To avoid having repeated buttons.
    // Adding new movie buttons.
    $("#movies-buttons").empty();

    for (i = 0; i < topics.length; i++) {
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

$(document).ready(function () {

    // generateButtons();

    // When search button is pressed ...
    $("#searchButton").on("click", function (event) {

        event.preventDefault();

        var movie = $("#search-box").val().trim();

        topics.push(movie);
        console.log("Button that was just created: " + movie);
        console.log(topics);

        generateButtons();
    });

    // Function showing the GIFs
    function showGifs() {
        var movie = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movie +"&api_key=eMyvfzpHKUO6Vzs4y2ZR5hTOnLM0C84Y&limit=10";

        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {   ///or .then
                clearSearchBox();
                var results = response.data;
                if (results == ""){
                    alert("Give another keyword a try! There is not GIFy for that!");
                }
                for (j = 0; j < results.length; j++) { 
                    var rating = results[j].rating;
                    var gifDiv = $("<div>");
                    var gifRating = $("<p><strong>").text("Rating: " + rating);
                    gifDiv.append(gifRating);

                    var movieImage = $("<img>");
                    movieImage.attr("src", results[j].images.fixed_height_still.url);  // <--- f_h_small_still.url
                    movieImage.attr("data-still", results[j].images.fixed_height_still.url);
                    movieImage.attr("data-animate", results[j].images.fixed_height.url);
                    movieImage.attr("data-state", "still");
                    movieImage.addClass("image");
                    
                    gifDiv.append(movieImage);
                    $("#gifsGoHere").prepend(gifDiv);
                } // End of 'for' loop

            });  // End of Document.function(response)

    } // End of Function showGifs()


    $(document).on("click", ".movie", showGifs);  // <--- Not working
    $(document).on("click", ".image", function() {
        // var that = $(this);
        var state = $(this).attr('data-state');

        if (state == "still") {
            $(this).attr("src", $(this).data('animate'));
            $(this).attr("data-state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", $(this).data('still'));
            $(this).attr("data-state", "still");
        }
    });

    generateButtons();  // <----- Need to locally define it! Not working

    // $(document)on("click", ".movie" , function(event) {
    //     ///           .............
    // });

});   // End of event listener for movie buttons