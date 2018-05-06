<?php

namespace App\Http\Controllers;

use App\Team;
use App\Player;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class TeamController extends Controller
{
	// Get all teams
	public function index(){
		$teams  = Team::all();
		foreach ($teams as $team) {
			$team->players;
		}
		return response()->json($teams, 200);
	}

	// Get team by id
	public function getTeam($id){
		$team = Team::find($id);
		if (!$team) {
			return response()->json([
				"status" => "error",
				"message" => "Aucune équipe ne correspond à cet identifiant."
			], 404);
		}
		$team->players;
		$team->matches;
		return response()->json($team, 200);
	}

	// Create a team (POST)
	public function createTeam(Request $request) {
		// Check if players exist
		$id_player1 = $request->id_player1;
		$id_player2 = $request->id_player2;
		if (!$id_player1 || !$id_player2) {
			return response()->json([
				"status" => "error",
				"message" => "Veuillez entrer 2 joueurs pour créer une équipe."
			], 404);
		} 
		if (!Player::find($id_player1) || !Player::find($id_player2)) {
			return response()->json([
				"status"=>"error",
				"message"=>"Les identifiants ne correspondent pas à des joueurs inscrits."
			], 404);
		} 
		if (Player::find($id_player1) == Player::find($id_player2)) {
			return response()->json([
				"status"=>"error",
				"message"=>"Un joueur ne peux pas faire équipe seul."
			], 404);
		}

		// Get or Create Team : 
		$teams = Team::all();
		$team_exists = false;
		foreach ($teams as $team) {
			if ($team->players->contains($id_player1) && $team->players->contains($id_player2)) {
				$team_exists = true;
				$team = Team::find($team->id);
				break;
			}
		}

		if (!$team_exists) {
			$team = Team::create($request->all());
			$team->players()->attach($request->id_player1);
			$team->players()->attach($request->id_player2);
		}
		
		$team->players;

		return response()->json($team, 200);
    }

    /* Update a team (PUT) by id */
	public function updateTeam(Request $request, $id) {
		// On récupère la team correspondant à l'id en paramètre
		$team = Team::find($id);

		// On met à jour ses infos
		if ($request->input('name')) 
			$team->name = $request->input('name');
		
		// On enregistre
		$team->save();

		// On retourne le joueur modifié
		return response()->json($team, 200);
	}

	public function deleteTeam($id){
		$team = Team::find($id);
		$team->delete();
		return response()->json('deleted', 200);
	}

}
