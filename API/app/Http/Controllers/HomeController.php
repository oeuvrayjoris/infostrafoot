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
		$best_scorers = $this->getBestScorers();
		return response()->json([
			"best_players" => $best_players,
			"last_players" => $last_players,
			"best_scorers" => $best_scorers,
		], 200);
	}

	/* Get the 3 best players */
	public function getBestPlayers(){
		// Order by victories (count innerjoin team innerjoin match_team where victory == 1), limit(3)->get()
		$players = Player::orderBy('username', 'asc')->limit(3)->get();
		return $players;
	}

	/* Get the 3 last players */
	public function getLastPlayers(){
		return Player::latest()->limit(3)->get();
	}

	/* Get the 3 best scorers */
	public function getBestScorers(){
		return Player::withCount('goals')
				->orderBy('goals_count', 'desc')
				->orderBy('username', 'asc')
				->limit(3)
				->get();
	}

}
