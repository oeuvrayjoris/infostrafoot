<?php

namespace App\Http\Controllers;

use App\Match;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MatchController extends Controller
{
	// Get all matches
	public function index(){
		$matches  = Match::all();
		return response()->json($matches, 200);
	}

	// Get match by id
	public function getMatch($id){
		$match = Match::find($id);
		$match->goals;
		return response()->json($match, 200);
	}

	// Get match by id_player
	public function getMatchByPlayer($id_player){
		$matches = Match::where("id_player", $id_player);
		return response()->json($matches, 200);
	}

	// Create a match (POST)
	public function createMatch(Request $request){
		$match = Match::create($request->all());
		return response()->json($match, 200);
    }

	public function deleteMatch($id){
		$match = Match::find($id);
		$match->delete();
		return response()->json('deleted', 200);
	}
}