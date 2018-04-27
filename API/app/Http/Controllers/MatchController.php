<?php

namespace App\Http\Controllers;

use App\Match;
use App\Team;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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

	public function deleteMatch($id){
		$match = Match::find($id);
		$match->delete();
		return response()->json('deleted', 200);
	}
}