<?php

/**
 * Created by PhpStorm.
 * User: Alban
 * Date: 20/04/2016
 * Time: 11:15
 */

ini_set("soap.wsdl_cache_enabled","0");
include '../tarotchecker.php';

class server {
	public function __construct() {

	}

	public function checkIsWinner($bidding, $stack, $nb_players, $is_announced_chelem) {
		return Checker::checkIsWinner($bidding, $stack, $nb_players, $is_announced_chelem);
	}

}
$params = array('uri' => 'tarot-checker/soap/server.php');

$server = new SoapServer(NULL, $params);

$server->setClass('server');
$server->handle();