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
        var mod = $("form input.server[type='radio']:checked").val();

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

        $.post( url, params, function( data ) {
            if (data && data.diff) {
                var str = "The player has ";
                if (data.diff > 0) {
                    str += "won ! ";
                } else {
                    str += "lost. ";
                }
                str += "score : " + data.score + "/" + data.scoreToDo + "(" + data.nb_oudlers + " oudlers) - Points : " + data.points;

                $("#result").text(str);
            }
            console.log( data );
        }, "json");

    };

    $("#submit").click(click);
})();