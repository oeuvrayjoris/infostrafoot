<?php

namespace App\Http\Controllers;

use App\Player;
use App\Http\Controllers\Controller;
use App\Http\Controllers\PlayerController;
use Illuminate\Http\Request;

class HomeController extends Controller
{

	public function index(){
		$best_players = $this->getBestPlayers();
		$last_players = $this->getLastPlayers();
		return response()->json([
			"best_players" => $best_players,
			"last_players" => $last_players,
		], 200);
	}

	/* Get the 3 best players */
	public function getBestPlayers(){
		// Order by victories (count innerjoin team innerjoin victory == 1), then limit(3)
		$players  = Player::limit(3)->get();
		return $players;
	}

	/* Get the 3 last players */
	public function getLastPlayers(){
		$players  = Player::latest()->limit(3)->get();
		return $players;
	}

}
