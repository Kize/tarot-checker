<?php
/**
 * Created by PhpStorm.
 * User: Alban
 * Date: 20/04/2016
 * Time: 16:16
 */

include '../tarotchecker.php';

$bidding = $_POST["bid"];
$stack = $_POST["stack"];
$nb_players = $_POST["nb"];
$is_chelem = $_POST["is_chelem"];

$res = Checker::checkIsWinner($bidding, $stack, $nb_players, $is_chelem);

echo json_encode($res);
