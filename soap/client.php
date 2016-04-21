<?php

/**
 * Created by PhpStorm.
 * User: Alban
 * Date: 20/04/2016
 * Time: 11:15
 */
class client {
	public function __construct() {
		$params = array('location' => 'http://localhost/tarot-checker/soap/server.php',
						'uri' => 'urn://tarot-checker/soap/server.php',
						'trace' => 1);
		$this->instance = new SoapClient(NULL, $params);
	}

	public function isWinner($data) {
		return $this->instance->__soapCall('checkIsWinner', $data);
	}
}


$client = new client();