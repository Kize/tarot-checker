<?php

/**
 * Created by PhpStorm.
 * User: Alban
 * Date: 20/04/2016
 * Time: 16:17
 */
class Checker {
	private function __construct() {
	}

	public static function checkIsWinner($name, $bidding, $stack, $nb_players, $is_announced_chelem) {
		// Count the stack, return infos
		$status = Checker::computeStack($stack);
		$score = $status[0];
		$nb_oudlers = $status[1];
		$has_excuse = $status[2];
		
		// Set the score to do in function of the stack
		$score_to_do = 56;
		switch ($nb_oudlers) {
			case 1 :
				$score_to_do -= 5;
				break;
			case 2 :
				$score_to_do -= 15;
				break;
			case 3 :
				$score_to_do -= 20;
				break;
		}
		
		// Compute the score and the score to do, to know if it's ok or not
		$differential = $score - $score_to_do;
		
		// Check if there is a chelem
		$is_chelem = Checker::computeChelem(count($stack), $has_excuse);
		$is_full_loose = count($stack) == 0;
		
		// Set the coef in function of the bidding
		$coeff = 1;
		if (strcmp($bidding, "guard") == 0 ){
			$coeff = 2;
		} elseif (strcmp($bidding, "without") == 0 ){
			$coeff = 4;
		} elseif (strcmp($bidding, "with") == 0 ){
			$coeff = 6;
		}
		
		// Compute scores for the scoreboard
		$contract = $coeff * (25 + abs($differential));
		
		if ($is_chelem) {
			$contract += 200;
			if ($is_announced_chelem) {
				$contract += 200;
			}
		} elseif ($is_announced_chelem) {
			$contract -= ($nb_players == 4) ? 75: 50;
		}
		
		if ($is_full_loose) {
			$contract -= 200;
		}
		
		$str = $name . " ";
		if ($differential < 0) {
			$str .= "lost, he made : " . $score . ", and should make : " . $score_to_do . "(" . $nb_oudlers . " oudlers)";
			$str .= "\n";
			$str .= $name . " score : " . (0 - ($contract*($nb_players - 1)));
		} else {
			$str .= "win, he made : " . $score . ", for : " . $score_to_do . "(" . $nb_oudlers . " oudlers)";
			$str .= "\n";
			$str .= $name . " score : " . $contract*($nb_players - 1);
		}
		
		return $str;
		/*$str = "cards : ";

		foreach($stack as $card) {
			$str .= " - " . $card;
		}

		$str .= " | score :" . $score . " | score to do : " . $score_to_do;*/
	}
	
	private static function computeChelem($count, $excuse) {
		if ($excuse){
			$nb_expected_cards = 78;
		} else {
			$nb_expected_cards = 77;
		}
		return $count == $nb_expected_cards;
	}
	
	private static function computeStack($stack) {
		$score = 0;
		$nb_oudlers = 0;
		$has_excuse = false;
		
		foreach($stack as $card) {
			if (strcmp($card, "TE") == 0) {
				$has_excuse = true;
			}
			$card_type = substr($card, 0,1);
			$card_number = substr($card, 1);
			
			if (strcmp($card_type, "T") == 0) {
				if (strcmp($card_number, "1") == 0 || strcmp($card_number, "21") == 0 || strcmp($card_number, "E") == 0) {
					$nb_oudlers ++;
					$score += 4;
				}
				$score += 0.5;
			} else {
				if (strcmp($card_number, "J") == 0) {
					$score += 1;
				} elseif (strcmp($card_number, "C") == 0) {
					$score += 2;
				} elseif (strcmp($card_number, "Q") == 0) {
					$score += 3;
				} elseif (strcmp($card_number, "K") == 0) {
					$score += 4;
				}
				$score += 0.5;
			}
		}
		
		$res = array();
		array_push($res, $score);
		array_push($res, $nb_oudlers);
		array_push($res, $has_excuse);
		return $res;
	}
}
