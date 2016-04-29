<?php

/**
 * Created by PhpStorm.
 * User: Alban
 * Date: 20/04/2016
 * Time: 16:17
 * Static class to check and compute the score of a player in the famous card game
 * The french tarot
 */
class Checker {
	private function __construct() {
	}

	/**
	 * Check if the player won this game, and returns the score.
	 *
	 * @param $bidding : Type of bid (accepted values : petite, garde, garde_sans, garde_contre
	 * @param $stack : String, list of cards taken by the player
	 * @param $nb_players : number of players
	 * @param $is_announced_chelem : Boolean, true if the player has announced a chelem
	 *
	 * @return array : List of data
	 */
	public static function checkIsWinner($bidding, $stack, $nb_players, $is_announced_chelem) {
		$stack = explode(",", $stack);
		$is_announced_chelem = ($is_announced_chelem === "true") ? true : false;
		$nb_players = intval($nb_players);

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
		if (strcmp($bidding, "garde") == 0 ){
			$coeff = 2;
		} elseif (strcmp($bidding, "garde_sans") == 0 ){
			$coeff = 4;
		} elseif (strcmp($bidding, "garde_contre") == 0 ){
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

		$points = ($differential < 0) ? (0 - ($contract*($nb_players - 1))) : $contract*($nb_players - 1);

		$result = array(
			"diff" 			=> $differential,
			"score"			=> $score,
			"scoreToDo"		=> $score_to_do,
			"points"		=> $points,
			"nb_oudlers" 	=> $nb_oudlers,
			"is_chelem"		=> $is_chelem
		);

		return $result;
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
			if (strcmp($card, "AE") == 0) {
				$has_excuse = true;
			}
			$card_type = substr($card, 0,1);
			$card_number = substr($card, 1);
			
			if (strcmp($card_type, "A") == 0) {
				if (strcmp($card_number, "1") == 0 || strcmp($card_number, "21") == 0 || strcmp($card_number, "E") == 0) {
					$nb_oudlers ++;
					$score += 4;
				}
				$score += 0.5;
			} else {
				if (strcmp($card_number, "V") == 0) {
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

