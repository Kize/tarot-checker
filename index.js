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


    var parser = function xmlToJson(xml) {

            // Create the return object
            var obj = {};

            if (xml.nodeType == 1) { // element
                // do attributes
                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (var j = 0; j < xml.attributes.length; j++) {
                        var attribute = xml.attributes.item(j);
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType == 3) { // text
                obj = xml.nodeValue;
            }

            // do children
            if (xml.hasChildNodes()) {
                for(var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof(obj[nodeName]) == "undefined") {
                        obj[nodeName] = xmlToJson(item);
                    } else {
                        if (typeof(obj[nodeName].push) == "undefined") {
                            var old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(xmlToJson(item));
                    }
                }
            }
            return obj;
        };

    var click = function(){
        var mod = $("form input.server[type='radio']:checked").val();

        var bidding = $("form input.announce[type='radio']:checked").val();
        var nb_players = $("form input.player[type='radio']:checked").val();
        var chelem = $("form input.chelem[type='checkbox']").is(":checked");

        var deck;
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
            }, "json");


        } else {

            var request = "<?xml version=\"1.0\"?>\n";
            request += "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\">\n";
            request += "<soap:Body xmlns:m=\"http://localhost/tarot-checker/soap/server.php\">\n";
            request += "<m:checkIsWinner>\n";
            request += "<m:bidding>\""+ bidding + "\"</m:bidding>\n";
            request += "<m:stack>\""+ deck + "\"</m:stack>\n";
            request += "<m:nb_players>\""+ nb_players +"\"</m:nb_players>\n";
            request += "<m:is_announced_chelem>\""+ chelem +"\"</m:is_announced_chelem>\n";
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
                    //console.log(el.item.key._, el.item.value._);
                });

                console.log(result);
                var str = "The player has ";
                if (result.diff > 0) {
                    str += "won ! ";
                } else {
                    str += "lost. ";
                }
                str += "score : " + result.score + "/" + result.scoreToDo + "(" + result.nb_oudlers + " oudlers) - Points : " + result.points;

                $("#result").text(str);

            });

            req.fail(function(msg){
                console.log(msg);
            });

        }


    };

    $("#submit").click(click);
})();