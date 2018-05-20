<?php

namespace App\Http\Controllers;

use DB;
use App\Player;
use App\Team;
use App\Http\Controllers\Controller;
use App\Http\Controllers\PlayerController;
use Illuminate\Http\Request;

class HomeController extends Controller
{

	public function index(){
		$best_players = $this->getBestPlayers();
		$last_players = $this->getLastPlayers();
		$best_scorers = $this->getBestScorers();
		$best_teams = $this->getBestTeams();
		return response()->json([
			"best_players" => $best_players,
			"last_players" => $last_players,
			"best_scorers" => $best_scorers,
			"best_teams" => $best_teams,
		], 200);
	}

	/* Get the 3 best players */
	public function getBestPlayers(){
		return Player::join('team_player', 'players.id', '=', 'team_player.player_id')
			->join('match_team', 'team_player.team_id', '=', 'match_team.team_id')
			->where('match_team.winner', 1)
			->select('players.id', 'players.username', 'players.firstname', 'players.lastname', DB::raw('count(winner) as victories_count'))
			->groupBy("id")
			->orderBy("victories_count", 'desc')
			->orderBy("username", 'desc')
			->limit(3)
			->get();
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

	/* Get the 3 best scorers */
	public function getBestTeams(){
		$teams = Team::join('match_team', 'teams.id', '=', 'match_team.team_id')
			->where('match_team.winner', 1)
			->select('id', 'name', DB::raw('count(*) as victories_count'))
			->groupBy("teams.id")
			->orderBy("victories_count", 'desc')
			->limit(3)
			->get();
		foreach ($teams as $team) {
			$team->players;
		}
		return $teams;
	}

}
