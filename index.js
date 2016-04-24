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
        var d1 = performance.now();
        var d2, ti;

        var mod = $("form input.server[type='radio']:checked").val();

        var bidding = $("form input.announce[type='radio']:checked").val();
        var nb_players = $("form input.player[type='radio']:checked").val();
        var chelem = $("form input.chelem[type='checkbox']").is(":checked");

        var deck = "";
        for (var i =0; i < cards.length; i++) {
            if (cards[i]) {
                deck += cards[i];
            }
            if (i !== cards.length -1){
                deck += ",";
            }

        }

        var url;
        if (mod === "rest") {
            url = "rest/checker.php";
            var params = {
                bid : bidding,
                stack : deck,
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

                d2 = performance.now();
                ti = d2 -d1;
                console.log("REST : " + ti + "ms.");
            }, "json");


        } else {

            var request = "<?xml version=\"1.0\"?>\n";
            request += "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\">\n";
            request += "<soap:Body xmlns:m=\"http://localhost/tarot-checker/soap/server.php\">\n";
            request += "<m:checkIsWinner>\n";
            request += "<m:bidding>"+ bidding + "</m:bidding>\n";
            request += "<m:stack>"+ deck + "</m:stack>\n";
            request += "<m:nb_players>"+ nb_players +"</m:nb_players>\n";
            request += "<m:is_announced_chelem>"+ chelem +"</m:is_announced_chelem>\n";
            request += "</m:checkIsWinner>\n";
            request += "</soap:Body>\n";
            request += "</soap:Envelope>";

            var req = $.ajax({
                type: "POST",
                url: "http://localhost/tarot-checker/soap/server.php",
                data: request,
                cache: false
            });

            req.done(function(msg){
                var result = {};
                $('item', msg).each(function(a, b) {
                    var el = $.xml2json(b);
                    if (el && el.item && el.item.key && el.item.key._) {
                        switch(el.item.key._) {
                            case "diff":
                                result.diff = el.item.value._;
                                break;
                            case "score":
                                result.score = el.item.value._;
                                break;
                            case "scoreToDo":
                                result.scoreToDo = el.item.value._;
                                break;
                            case "points":
                                result.points = el.item.value._;
                                break;
                            case "nb_oudlers":
                                result.nb_oudlers = el.item.value._;
                                break;
                            case "is_chelem":
                                result.is_chelem = el.item.value._;
                                break;
                        }
                    }

                    //console.log(el.item.key._, el.item.value._);
                });

                console.log(msg);
                var str = "The player has ";
                if (result.diff > 0) {
                    str += "won ! ";
                } else {
                    str += "lost. ";
                }
                str += "score : " + result.score + "/" + result.scoreToDo + "(" + result.nb_oudlers + " oudlers) - Points : " + result.points;

                $("#result").text(str);

                d2 = performance.now();
                ti = d2 -d1;
                console.log("SOAP : " + ti + "ms.");

            });

            req.fail(function(msg){
                console.log(msg);
            });


        }


    };

    $("#submit").click(click);
})();