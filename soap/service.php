<?php
/**
 * Created by PhpStorm.
 * User: Alban
 * Date: 20/04/2016
 * Time: 11:15
 */

include './client.php';


//$postdata = file_get_contents("php://input");
//$data = json_decode($postdata);

$stack = array();
for ($i = 1; $i <= 21; $i++) {
	$str = "T" . $i;
	array_push($stack, $str );
}

array_push($stack, "TE");
array_push($stack, "DK");
array_push($stack, "DQ");

$data = array(
	'param1' => 'John Cena',
	'param2' => 'guard',
	'param3' => $stack,
	'param4' => 5,
	'param5' => false
);

echo $client->isWinner($data);