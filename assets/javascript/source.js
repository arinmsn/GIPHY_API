/*

### Bonus Goals

X-------1. Ensure your app is fully mobile responsive.
BUT....search-box is too small in mobile.

2. Allow users to request additional gifs to be added to the page.
   * Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.

3. List additional metadata (title, tags, etc) for each gif in a clean and readable format.

X--------4. Include a 1-click download button for each gif, this should work across device types.
Just add download functionality to download the image.

5. Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and 
build something you are proud to showcase in your portfolio

6. Allow users to add their favorite gifs to a `favorites` section.
   * This should persist even when they select or add a new topic.
   * If you are looking for a major challenge, look into making this
   * section persist even when the page is reloaded(via localStorage or cookies).




7. If user types empty string, it prints empty key!
X-----It does say in message that the empty key cannot return any GIFs.

8. First rating text .. does it show double?? Does it has to do with CSS?

9. README.md (MARKUP)

*/





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

        // if (movie === null) {
        //     $("#search-box").addClass()
        // } else {
        //     return;
        // }

        event.preventDefault();
        
        var movie = $("#search-box").val().trim();
         
        
        topics.push(movie);
        console.log("Button that was just created: " + movie);
        

        // document.body.onkeyup = function(e){
        //     if((e.keyCode == 32 || e.keyCode == 13)) && movie !== null {
        //         alert("You pressed either this or that!!")};
        //     }
        // }
        // if (movie === null) {
        //     alert("Give another keyword a try! There is not GIFy for that!");
        // }
        console.log(topics);

        generateButtons();
    });

    document.body.onkeyup = function(e){
        if(e.keyCode == 13){
            ;
        }
    }

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
                // if (results == "" || movie == "") {
                //     alert("Give another keyword a try! There is not GIFy for that!");
                // }
                for (j = 0; j < results.length; j++) { 
                    var rating = results[j].rating;
                    var gifDiv = $("<div style='border: thin solid black'>");
                    var gifRating = $("<p>").text("Rating: " + rating);

                    // Download button
                    var dnldButton = $("<button type='button' class='btn btn-primary btn-sm dnldButton'>Download</button>");
                    
                    // Download Button End 

                    gifDiv.append(gifRating);
                    gifRating.append(dnldButton);
                    

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


    // var dnldAction = <a href="/images/myw3schoolsimage.jpg" download>
    // $(document)on("click", ".movie" , function(event) {
    //     ///           .............
    // });

});   // End of event listener for movie buttons