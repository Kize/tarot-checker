/**
 * Created by corentin on 20/04/2016.
 */
(function (){

    var cards;

    var changed = function(value_before, value_after){
        cards = value_after;
    };

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

    var click = function(){
        // Retrieve the picker

        var mod = $("form input.server[type='radio']:checked").val();
        console.log(mod);

        var url;
        if (mod === "rest") {
            url = "rest/checker.php";
        } else {
            url = "soap/service.php";
        }

        var bidding = $("form input.announce[type='radio']:checked").val();
        var nb_players = $("form input.player[type='radio']:checked").val();
        var chelem = $("form input.chelem[type='checkbox']").is(":checked");

        var params = {
            bid : bidding,
            stack : cards,
            nb : nb_players,
            is_chelem : chelem
        };
        //console.log(params);

        $.post( url, params, function( data ) {
            console.log( data );
        }, "json");

    };

    $("#submit").click(click);
})();