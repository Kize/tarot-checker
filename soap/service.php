<?php
/**
 * Created by PhpStorm.
 * User: Alban
 * Date: 20/04/2016
 * Time: 11:15
 */

include './client.php';

$bidding = $_POST["bid"];
$stack = $_POST["stack"];
$nb_players = $_POST["nb"];
$is_chelem = $_POST["is_chelem"];

$is_chelem = ($is_chelem === "true") ? true : false;

$data = array(
	'param1' => $bidding,
	'param2' => $stack,
	'param3' => $nb_players,
	'param4' => $is_chelem
);

echo json_encode($client->isWinner($data));
