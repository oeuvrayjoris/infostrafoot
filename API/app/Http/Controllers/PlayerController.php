<?php

namespace App\Http\Controllers;

use App\Player;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;

class PlayerController extends Controller
{

	// Get all players
	public function index(){
		$players  = Player::all();
		return response()->json($players);
	}

	// Get player by id
	public function getPlayer($id){
		$Player  = Player::find($id);
		return response()->json($Player);
	}

	// Create a player (POST)
	public function createPlayer(Request $request){
		$player = Player::create($request->all());
		//$player->password = Hash::make($player->password);
		return response()->json($request);
		return response()->json($player);
	}

	// Update a player (PUT) by id
	public function updatePlayer(Request $request, $id){
		// On récupère le joueur
		$player = Player::find($id);

		// On met à jour ses infos
		if ($request->input('username')) 
			$player->username = $request->input('username');
		if ($request->input('password'))
			$player->password = Hash::make($request->input('password'));
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

	public function authenticate(Request $request){
		// On valide la requête d'authentification si username et password sont renseignés
		$this->validate($request, [
			'username' => 'required',
			'password' => 'required'
		]);
		// On créer un user avec le Player qui a le username indiqué dans la requête
    	$user = Player::where('username', $request->input('username'))->first();
    	if ($user == NULL)
    		return response()->json(['status' => 'fail', 'message' => 'Aucun utilisateur avec ce pseudo']);

    	// DEBUGAGE return response()->json(['requete' => $request->input('password'),'user pass' => $user->password]);

    	// On regarde si le mot de passe du user est bien le mot de passe indiqué dans la requête
		if(Hash::check($request->input('password'), $user->password)){
        	$apitoken = base64_encode(str_random(40));

        	Player::where('username', $request->input('username'))->update(['api_token' => "$apitoken"]);

        	// Si oui on retourne un statut de succés et un token d'authentification
        	return response()->json(['status' => 'success','api_token' => $apitoken]);
      	} else // Sinon, on retourne un statut d'erreur
          	return response()->json(['status' => 'fail', 'message' => 'Mot de passe incorrect'],401);
   	}
}