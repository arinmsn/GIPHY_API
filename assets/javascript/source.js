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

        a.addClass("movie");

        // We apply the attribute data-name='...' to each item in the array.
        a.attr("data-name", topics[i]);

        a.text(topics[i]);
        $("#movies-buttons").append(a);
    }
}

// When search button is pressed ...
$("#searchButton").on("click", function(event) {
    
    event.preventDefault();
    
    var movie = $("#search-box").val().trim();
    
    topics.push(movie);
    
    generateButtons();
});

generateButtons();