$(document).ready(function(){
    //create array of topics
    var topics = ["piano","guitar","bass","maracas","drums","tambourine","trombone","violin","flute","trombone","tuba"];

    //var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");

    var baseSearch = "http://api.giphy.com/v1/gifs/search?q=";
    var apiKey = "DoJ0bt0nmVdBY1sIeFbK5eu99dAFIdgb";

    var searchTerm;
    var limit;

    var fullQuery;

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

    // create onclick for adding new instrument
    $("#addInstrument").on("click", function(){
        event.preventDefault();
        var newInstrument = $("#newInstrument").val().trim();
        newButton(newInstrument);
    });

    // function to assemble query
    function queryConstructor(){
        fullQuery = baseSearch + searchTerm +"&api_key="+ apiKey +"&limit="+ limit;
        $.ajax({
            url: fullQuery,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            makeGif(response.data);
        });
    }

    // create onclick for dynamically created search buttons
    $(document).on("click", ".instrument" , function() {
        searchTerm = $(this).text();
        limit = $("#numResults").val().trim();
        queryConstructor();
    });

    // create GIF element constructor to plug into queryConstructor
    function makeGif(response){
        for (gifs in response){
            var newGif = $("<img>");
            var animUrl = response[gifs].images.fixed_height_small.url;
            var stillUrl = response[gifs].images.fixed_height_small_still.url;
            newGif.attr("src", stillUrl);
            newGif.attr("still", stillUrl);
            newGif.attr("anim", animUrl);
            newGif.attr("isPlay", "false");
            newGif.on("click", function(){
                if($(this).attr("isPlay") == "false"){
                    $(this).attr("isPlay", "true");
                    $(this).attr("src", $(this).attr("anim"));
                } else {
                    $(this).attr("isPlay", "false");
                    $(this).attr("src", $(this).attr("still"));
                }
            })
            $("#gifs").append(newGif);
        }
    }



});
