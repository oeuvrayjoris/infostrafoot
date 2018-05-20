<?php

namespace App\Http\Controllers;

use App\Player;
use App\Match;
use App\Team;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use DB;

class MatchController extends Controller
{
	// Get all matches
	public function index(){
		$matches  = Match::all();
		foreach ($matches as $match) {
			$match->teams;
		}
		return response()->json($matches, 200);
	}

	// Get match by id
	public function getMatch($id){
		$match = Match::find($id);
        if (!$match) {
			return response()->json([
				"status"=>"error",
				"message"=>"Le match n'existe pas."
			], 404);
		}
		$match->goals;
		$match->teams;
		return response()->json($match, 200);
	}

	// Get match by id_player
	public function getMatchByPlayer($id_player){
		$matches = Match::where("id_player", $id_player);
		return response()->json($matches, 200);
	}

	// Create a match (POST)
	public function createMatch(Request $request){
		// Check if teams exist
		$id_team1 = $request->id_team1;
		$id_team2 = $request->id_team2;
		if (!$id_team1 || !$id_team2) {
			return response()->json([
				"status" => "error",
				"message" => "Veuillez entrer 2 équipes pour créer un match."
			], 404);
		}
		if (!Team::find($id_team1) || !Team::find($id_team2)) {
			return response()->json([
				"status"=>"error",
				"message"=>"Les identifiants ne correspondent pas à des équipes existantes."
			], 404);
		} 
		if (Team::find($id_team1) == Team::find($id_team2)) {
			return response()->json([
				"status"=>"error",
				"message"=>"Une équipe ne peux pas faire un match seule."
			], 404);
		}

		$match = Match::create($request->all());
		$match->teams()->attach($request->id_team1);
		$match->teams()->attach($request->id_team2);
		$match->teams;
		return response()->json($match, 200);
    }

    /* Update a match (PUT) by id and set the winner team*/
	public function setWinner(Request $request, $id) {
		$match = Match::find($id);
		if (!$match){
			return response()->json([
					"status" => "error",
					"message" => "L'identifiant ne correspond pas à un match existant."
 				], 404);
		}
		if ($request->input('winner')){
			// Check if team exists and if it is part of the match
			$id_winner = $request->winner;
			if (!Team::find($id_winner)){
				return response()->json([
					"status" => "error",
					"message" => "L'identifiant ne correspond pas à une équipe existante."
 				], 404);
			}
			$find = NULL;
			$teams = $match->teams;
			foreach ($teams as $team) {
				$match->teams()->updateExistingPivot($team, array('winner' => 0));
				if ($team = Team::find($id_winner)){
					$find = 1;
					$match->teams()->updateExistingPivot($team, array('winner' => 1));
				}
			}
			if (!$find){
				return response()->json([
					"status" => "error",
					"message" => "L'équipe entrée ne fait pas partie du match selectionné."
				], 404);
			}
		}
		if ($request->input('end_time')){
			$match->end_time = $request->input('end_time');
		}
		$match->save();
		return response()->json($match, 200);
	}

	public function deleteMatch($id){
		if (Auth::user()->role != "admin"){
			return response()->json(['status' => 'fail', 'message' => "Vous n'avez pas les droits pour supprimer ce match."], 401);
		}
		$match = Match::find($id);
		$match->delete();
		return response()->json('deleted', 200);
	}
}