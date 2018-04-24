<?php

namespace App\Http\Controllers;

use App\Team;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class TeamController extends Controller
{
	// Get all teams
	public function index(){
		$teams  = Team::all();
		return response()->json($teams, 200);
	}

	// Get team by id
	public function getTeam($id){
		$team = Team::find($id);
		return response()->json($team, 200);
	}

	// Create a team (POST)
	public function createTeam(Request $request){
		$team = Team::create($request->all());
		return response()->json($team, 200);
    }

    /* Update a team (PUT) by id */
	public function updateTeam(Request $request, $id) {
		// On récupère la team correspondant à l'id en paramètre
		$team = Team::find($id);

		// On met à jour ses infos
		if ($request->input('name')) 
			$team->name = $request->input('name');
		if ($request->input('id_player1'))
			$team->id_player1 = $request->input('id_player1');
		if ($request->input('id_player2'))
			$team->id_player2 = $request->input('id_player2');
		
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
