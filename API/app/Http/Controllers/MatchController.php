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
		return response()->json($matches);
	}

	// Get match by id
	public function getMatch($id){
		$Match = Match::find($id);
		return response()->json($Match);
	}

	// Create a match (POST)
	public function createMatch(Request $request){
		$match = Match::create($request->all());
		return response()->json($match);
    }

	public function deleteMatch($id){
		$match = Match::find($id);
		$match->delete();
		return response()->json('deleted');
	}
}
