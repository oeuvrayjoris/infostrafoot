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

	// Update a player (PUT) by id
	public function updatePlayer(Request $request, $id){
		// On récupère le joueur
		$player = Player::find($id);

		// On met à jour ses infos
		if ($request->input('username')) 
			$player->username = $request->input('username');
		if ($request->input('password'))
			$player->password = $request->input('password');
		if ($request->input('firstname'))
			$player->firstname = $request->input('firstname');
		if ($request->input('lastname'))
			$player->lastname = $request->input('lastname');
		if ($request->input('birthdate'))
			$player->birthdate = $request->input('birthdate');
		if ($request->input('mail'))
			$player->mail = $request->input('mail');

		// On enregistre
		$player->save();

		// On retourne le joueur modifié
		return response()->json($player);
	}

	public function deletePlayer($id){
		$player  = Player::find($id);
		$player->delete();
		return response()->json('deleted');
	}
}
