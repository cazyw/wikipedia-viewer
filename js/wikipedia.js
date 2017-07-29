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
            $(".errorBox").css('visibility','visible').html(html);

        } else {


            $('.search-segment').animate({'margin-top': '0px'}, 'slow');


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
            $('.resultList').css('display', 'block');
            $('.resultList').animate({'margin-top': '0px', 'opacity': 1}, 'slow');
            //$('.resultList').fadeIn('slow');
            
            
            $(".resultList").html(html);

            
            
           
        }
      }, error: function(XMLHttpRequest, textStatus, errorThrown) {
        $(".errorBox").css('visibility','visible').html("hmmm there was an error"); 
    }
    });
}

function validateInput(value){
    return (!(value.length === 0));
}

$(document).ready(function(){

    let gap = '100px';
    $(".errorBox").css('visibility','hidden').html("no errors"); 

    $("#clear-form").on("click", function(){
        $("input").attr("readonly", false);
        $("#submit").attr("disabled", false);
        $("#search-input").val("");
        $(".errorBox").css('visibility','hidden');
        $(".resultList").animate({'opacity': 0}, 'slow', function(){
            $(".resultList").css('margin-top', gap).html("");
            $('.search-segment').animate({'margin-top': '100px'}, 'slow');
        });
    });

    $('#search-form').on("submit",function(e) {
        e.preventDefault();
        $("input").blur();
        $(".resultList").animate({'opacity': 0}, 'slow', function(){
            $(".resultList").css('margin-top', gap);
        });

        var term = "";
        term = $("#search-form :input[name='search-input']")[0]["value"];
        console.log("Term:" , term, '-', term.length);
        if (!(/[A-z0-9]+/.test(term)) || term.length === 0 || term === "" || term === undefined || term === "undefined"|| term === " ") {
            $(".errorBox").css('visibility','visible');
            $(".errorBox").html("Did you enter anything?");
        } else {
            $("input").attr("readonly", true);
            $("#submit").attr("disabled", true);
            $(".errorBox").css('visibility','hidden');
            getWikiPage(term);
        }
        
        $('#search-input').mouseenter(function(){
            if($("input").is('[readonly=readonly]')){
                $(".errorBox").css('visibility','visible').html("Hit the X to clear the search");    
            }
        
        });
        $('#search-input').mouseleave(function(){
             if($("input").is('[readonly=readonly]')){
                $(".errorBox").css('visibility','hidden');    
            }
        });
         $('#search-input').on("click", function(){
             if($("input").is('[readonly=readonly]')){
                $("input").blur();
                $(".errorBox").css('visibility','visible').html("Hit the X to clear the search");   
            }
        });       

    });
  
});