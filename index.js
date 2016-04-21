/**
 * Created by corentin on 20/04/2016.
 */
(function (){

    var cards;

    var changed = function(value_before, value_after){
        cards = value_after;
    }

    $("select").imagepicker({
        changed : changed
    });
    var li = $("ul li:nth-child(15)");
    li.css("clear","both");
    var li = $("ul li:nth-child(29)");
    li.css("clear","both");
    var li = $("ul li:nth-child(43)");
    li.css("clear","both");
    var li = $("ul li:nth-child(57)");
    li.css("clear","both");
    /*index = 1;
    while(li = li.next() && li != undefined){
        index++;
        if(index % 14 == 0 && index <= 56){
            li.after("<br/>");
        }
    }*/

    var click = function(){
        // Retrieve the picker
        var data = $("select").data('picker');
        console.log(data);
    }
    $("button").click(click);
})();