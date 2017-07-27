function jsonlength(obj) {
    return Object.keys(obj).length;
}


function getWikiPage(term){


    var wikiLink = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=10&callback=?&gsrsearch=" + term;

    $.ajax({url: "demo_test.txt", success: function(result){
        $("#div1").html(result);
    }});

    $.ajax({
      dataType: 'json',
      url: wikiLink,
      success: function(data) {
        console.log(JSON.stringify(data), "length: ", data.length);
        
        
        if (!(data.hasOwnProperty("query"))) {
            console.log("oops")
            var html = "Hmmmm no results?";
            $(".errorBox").html(html);

        } else {
            var result = data["query"]["pages"];
            var html = "";
            Object.keys(result).forEach(function(key, index) {
                var title = result[key]["title"];
                var extract = result[key]["extract"];
                var page = result[key]["pageid"];
                var link = "https://en.wikipedia.org/?curid=" + page;
                console.log(index, ": ", title, " - ", extract);
                html += "<a href=\"" + link + "\" target=\"_blank\">";
                html += "<div class='resultsBox panel panel-default'>";
                html += "<div class='panel-heading'>";
                html += "<h3 class='panel-title'>" + title + "</h3>"
                html += "</div>";
                html += "<div class='panel-body'>" + extract + "</div>";
                html += "</div>";
                html += "</a>";
            });
            
            $(".resultList").html(html);

            
            $(".resultList").fadeIn();
            $('.resultList').animate({'margin-top': '0px'}, 'slow');
        }
      }, error: function(XMLHttpRequest, textStatus, errorThrown) {
        $(".resultsList").html("Oh no - error!");
    }
    });
}



$(document).ready(function(){
    //getWikiPage();

    let view = $(window).height();
    let section = $("#top-section").height();

    function(){
        section = $("#top-section").height();
    
    let gap = view - section;
$(".resultList").css('margin-top', gap);
    // $(".resultList").css('margin-top', gap);
    $("#clear-form").on("click", function(){
        $("#search-input").val("");
        $(".errorBox").html("");
        $(".resultList").fadeOut("slow", function(){
            $(".resultList").css('margin-top', gap);

        });
    });

    $('#search-form').on("submit",function(e) {
        e.preventDefault();
        $("input").blur();

        $(".resultList").fadeOut("slow", function(){
            $(".resultList").css('margin-top', gap);
        });

        var term = "";
        term = $("#search-form :input[name='search-input']")[0]["value"];
        console.log("Term: " , term);
        if (term == "" || term == undefined || term == "undefined") {
            $(".resultList").html("Please enter a search term");
        } else {
            getWikiPage(term);
        }
        
        
    });
    
});