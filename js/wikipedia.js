function jsonlength(obj) {
    return Object.keys(obj).length;
}


function getWikiPage(term){

//https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=coding&srprop=snippet&srlimit=10

    var start = "https://en.wikipedia.org/w/api.php?";
    var action = "action=query&list=search&";
    var format = "format=json&";
    var returntype = "prop=extracts&exintro&explaintext&exsentences=1&srlimit=10&callback=?&srsearch=" + term;
    var wikiLink = start + action + format + returntype;
    var wikiLink = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=10&callback=?&gsrsearch=" + term;
    // look at ajax

//https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=thor&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=10

    $.ajax({url: "demo_test.txt", success: function(result){
        $("#div1").html(result);
    }});

    $.ajax({
      dataType: 'json',
      url: wikiLink,
      success: function(data) {
        console.log("length: ", jsonlength(data["query"]["pages"]));
        var result = data["query"]["pages"];
        if (result.length == 0) {
            var html = "Hmmmm no results?";
            $(".resultList").html(html);

        } else {
            var html = "";
            Object.keys(result).forEach(function(key, index) {
                var title = result[key]["title"];
                var extract = result[key]["extract"];
                console.log(index, ": ", title, " - ", extract);




                html += "<div class='resultsBox panel panel-default'>";
                html += "<div class='panel-heading'>";
                html += "<h3 class='panel-title'>" + title + "</h3>"
                html += "</div>";
                html += "<div class='panel-body'>" + extract + "</div>";
                html += "</div>";
            });
            
            $(".resultList").html(html);
        }
      }, error: function(XMLHttpRequest, textStatus, errorThrown) {
        $(".resultsList").html("Oh no - error!");
    }
    });
}

$(document).ready(function(){
    //getWikiPage();

    $("#clear-form").on("click", function(){
        $("#search-input").val("");
    })

    $('#search-form').on("submit",function(e) {
        // get all the inputs into an array.
        var term = "";
        term = $("#search-form :input[name='search-input']")[0]["value"];
        console.log("Term: " , term);
        if (term == "" || term == undefined || term == "undefined") {
            $(".resultList").html("Please enter a search term");
        } else {
            getWikiPage(term);
        }
        
        e.preventDefault();
    });
    
});