$(document).ready(function(){
    //create array of topics
    var topics = ["piano","guitar","bass","maracas","drums","tambourine","trombone","violin","flute","trombone","tuba"];

    // for each item in topics, create a button
    for (topic in topics){
        var newBut = $("<button>"+topics[topic]+"</button>");
        newBut.addClass("instrument");
        $("#topics").append(newBut);
    }

});
