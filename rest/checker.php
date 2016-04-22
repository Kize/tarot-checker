<?php
/**
 * Created by PhpStorm.
 * User: Alban
 * Date: 20/04/2016
 * Time: 16:16
 */

include '../tarotchecker.php';

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);


echo Checker::checkIsWinner($data[0], $data[1], $data[2], $data[3], $data[4]);