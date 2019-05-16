$(document).ready(function(){
    //create array of topics
    var topics = ["piano","guitar","bass","maracas","drums","tambourine","trombone","violin","flute","trombone","tuba"];

    //var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");

    var apiKey = "DoJ0bt0nmVdBY1sIeFbK5eu99dAFIdgb";

    var searchTerm;

    // function to create new buttons and append them
    function newButton(butName) {
        var newBut = $("<button>");
        newBut.text(butName);
        newBut.addClass("instrument");
        $("#topics").append(newBut);
    }
    // for each item in topics, create a button
    for (topic in topics){
        var curTopic = topics[topic];
        newButton(curTopic);
    }

    //create onclick for adding new instrument
    $("#addInstrument").on("click", function(){
        event.preventDefault();
        var newInstrument = $("#newInstrument").val();
        newButton(newInstrument);
    });

});
