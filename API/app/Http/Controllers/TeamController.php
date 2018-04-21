<?php

namespace App\Http\Controllers;

use App\Team;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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

	public function deleteTeam($id){
		$team = Team::find($id);
		$team->delete();
		return response()->json('deleted', 200);
	}
}
