$(document).ready(function(){

    /*------ VARIABLES -------*/
    // array of topics for buttons
    var topics = ["piano","guitar","bass","maracas","drums","tambourine","trombone","violin","flute","trombone","tuba"];

    // static API search variables
    var baseSearch = "https://api.giphy.com/v1/gifs/search?q=";
    var apiKey = "DoJ0bt0nmVdBY1sIeFbK5eu99dAFIdgb";

    // dynamic API search variables
    var searchTerm;
    var limit;

    // variable to hold assembled query
    var fullQuery;

    /*------ CREATE BUTTONS -------*/
    // function to create new buttons and append them
    function newButton(butName) {
        var newBut = $("<button>");
        newBut.text(butName);
        newBut.addClass("instrument");
        newBut.addClass("btn-outline-primary");
        newBut.addClass("btn");
        newBut.addClass("px-3");
        newBut.addClass("m-1");
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
        if($("#newInstrument").val().trim()){
            var newInstrument = $("#newInstrument").val().trim();
            $("#newInstrument").val("");
            newButton(newInstrument);  
        }

    });

    /*------ QUERY -------*/
    // function to assemble query
    function queryConstructor(){
        fullQuery = baseSearch + searchTerm +"&api_key="+ apiKey +"&limit="+ limit;
        $.ajax({
            url: fullQuery,
            method: "GET"
        }).then(function(response) {
            makeGif(response.data);
        });
    }

    /*------ ONCLICK EVENTS -------*/
    // create onclick for dynamically created search buttons
    $(document).on("click", ".instrument" , function() {
        $("#gifs").empty()
        searchTerm = $(this).text();
        limit = $("#numResults").val().trim();
        queryConstructor();
        $("#instrument").text($(this).text());
    });

    // create onclick for setting favorites
    $(document).on("click", ".favIcon", function(){
        $(this).removeClass();
        $(this).addClass("fav");
        $("#favGifs").append($(this).closest(".thumb"));
    })

    // create onclick for removing favorites
    $(document).on("click", ".fav", function(){
        $(this).removeClass();
        $(this).addClass("favIcon");
        $("#gifs").append($(this).closest(".thumb"));
    })

    /*------ CREATE GIF THUMBNAILS -------*/
    // create GIF element constructor to plug into queryConstructor
    function makeGif(response){

        for (gifs in response){

            // crete new thubnail div
            var newThumb = $("<div>");
            newThumb.addClass("thumb");

            // create gif, add attributes for still and playing
            var newGif = $("<img>");
            var animUrl = response[gifs].images.fixed_height_small.url;
            var stillUrl = response[gifs].images.fixed_height_small_still.url;
            newGif.attr("src", stillUrl);
            newGif.attr("still", stillUrl);
            newGif.attr("anim", animUrl);
            newGif.attr("isPlay", "false");

            // create onclick function to play/stop gif
            newGif.on("click", function(){
                if($(this).attr("isPlay") == "false"){
                    $(this).attr("isPlay", "true");
                    $(this).attr("src", $(this).attr("anim"));
                } else {
                    $(this).attr("isPlay", "false");
                    $(this).attr("src", $(this).attr("still"));
                }
            })

            // append gif to thumbnail
            newThumb.append(newGif);

            // create div to hold gif data
            var gifData = $("<div>");

            // clone favorite heart from HTML, add class for hover functionality
            var newFav = $("#favIcon").clone();
            newFav.removeAttr("id");
            newFav.addClass("favIcon");          


            gifData.append(newFav);

            var newRat = $("<div>");
            newRat.addClass("rating");
            newRat.text("Rating: "+ response[gifs].rating);

            gifData.append(newRat);

            newThumb.append(gifData);

            $("#gifs").append(newThumb);
        }
    }



});
