var movieTitles = [
    "Home Alone",
    "Alice in Wonderland",
    "Lord of the Rings",
    "Star Wars",
    "Hobbit",
    "Harry Potter", 
    "Toy Story"
];

// This function will take care of dynamicaly generating buttons.
function generateBtns() {

    // To avoid having repeasted buttons.
    // Adding new movie buttons.
    $("#moviesBtns").empty();

    for (i=0; i < movieTitles.length; i++){

        // Buttons for each item in array will be generated. <button>...</button>
        var b = $("<button>");

        a.addClass("movie");

        // We apply the attribute data-name='...' to each item in the array.
        a.attr("data-name", movies[i]);
        
        $("movieBtns").append(a);
    }
}

