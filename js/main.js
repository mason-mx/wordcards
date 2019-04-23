function emptyResultsContainer () {
    $("#results-container").empty();
}

function JekyllSearch(){
    var items = [];
    $.getJSON( "/wordcards/search.json", function( data ) {
        $.each( data, function( key, val ) {
            items.push( "<li><a href='" + val.url + "'>" +val.title + "</a></li>" );
        });
    });
    $("#search-input").keyup(function(){
        $("#search-input").css("background-color","pink");
        var text = document.getElementById('search-input').value;
        emptyResultsContainer();
        if (text.length > 0) {
            var re = new RegExp(text, "gi");
            $.each(items, function( index, value ) {
                //console.log(value);
                var res = value.match(re);
                //console.log(res);
                if(res != null) {
                    $("#results-container").append(value);
                }
            }); 
        }
        else {
            $("#search-input").css("background-color","white");
        }
    });
}

$(document).ready(function(){
  JekyllSearch();
});
