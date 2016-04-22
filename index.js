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

        console.log($("form input.player[type='radio']:checked").val());
        console.log($("form input.announce[type='radio']:checked").val());
        console.log($("form input.chelem[type='checkbox']").is(":checked"));
        console.log(cards);
        console.log($("form input.server[type='radio']:checked").val());
        /*$.get(
            "somepage.php",
            {paramOne : 1, paramX : 'abc'},
            function(data) {
                alert('page content: ' + data);
            }
        );*/

    };

    $("#submit").click(click);
})();