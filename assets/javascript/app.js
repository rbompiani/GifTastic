$(document).ready(function(){
    //create array of topics
    var topics = ["piano","guitar","bass","maracas","drums","tambourine","trombone","violin","flute","trombone","tuba"];

    var baseSearch = "https://api.giphy.com/v1/gifs/search?q=";
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
            makeGif(response.data);
        });
    }

    // create onclick for dynamically created search buttons
    $(document).on("click", ".instrument" , function() {
        $("#gifs").empty()
        searchTerm = $(this).text();
        limit = $("#numResults").val().trim();
        queryConstructor();
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

    // create GIF element constructor to plug into queryConstructor
    function makeGif(response){

        for (gifs in response){

            var newThumb = $("<div>");
            newThumb.addClass("thumb");

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

            newThumb.append(newGif);

            var gifData = $("<div>");


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
