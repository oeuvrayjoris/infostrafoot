<?php

namespace App\Http\Controllers;

use App\Player;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;

class PlayerController extends Controller
{
	public function __construct() {
		$this->middleware('auth', ['only' => [
			'info',
			'updatePlayer',
			'deletePlayer',
		]]);
	}

	// Get all players
	public function index() {
		$players = Player::all();
		return response()->json($players);
	}

	// Get player by id
	public function getPlayer($id){
		$Player = Player::find($id);
		return response()->json($Player);
	}

	// Create a player (POST)
	public function createPlayer(Request $request) {
		// Check if username is available
		$username = $request->input('username');
		if (Player::isUsernameAvailable($username)) {
			$player = Player::create($request->all());
			$player->password = Hash::make($request->input('password'));
			$player->api_token = base64_encode(str_random(40));
			$player->save();
			return response()->json($player);
		} else {
			return response()->json(['status' => 'fail', 'message' => "Ce nom d'utilisateur existe déjà."]);
		}
	}
	
	// Update a player (PUT) by id
	public function updatePlayer(Request $request, $id) {
		// On récupère le joueur correspondant à l'id
		$player = Player::find($id);

		// On vérifie que l'utilisateur modifie sa propre page
		if ($player != Auth::user()) {
			return response()->json(['status' => 'fail', 'message' => "Vous n'avez pas les droits pour effectuer cette modification."]);
		}

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

	public function deletePlayer($id) {
		$player = Player::find($id);
		if ($player != Auth::user()) {
			return response()->json(['status' => 'fail', 'message' => "Vous n'avez pas les droits pour supprimer cet utilisateur."]);
		}
		$player->delete();
		return response()->json(['status' => 'success', 'message' => "Le profil a bien été supprimé."]);
	}

	public function authenticate(Request $request) {
		// On valide la requête d'authentification si username et password sont renseignés
		$this->validate($request, [
			'username' => 'required',
			'password' => 'required'
		]);

		// On créer un user avec le Player qui a le username indiqué dans la requête
		$user = Player::where('username', $request->input('username'))->first();

		if ($user == NULL)
			return response()->json(['status' => 'fail', 'message' => 'Aucun utilisateur avec ce pseudo']);

		// On regarde si le mot de passe du user est bien le mot de passe indiqué dans la requête
		if (Hash::check($request->input('password'), $user->password)) {
			$apitoken = base64_encode(str_random(40));

			// On génère un nouvel api_token à chaque connexion
			Player::where('username', $request->input('username'))->update(['api_token' => "$apitoken"]);

			// Si oui on retourne un statut de succès et un token d'authentification
			return response()->json(['status' => 'success', 'api_token' => $apitoken]);
		} else { // Sinon, on retourne un statut d'erreur
			return response()->json(['status' => 'fail', 'message' => 'Mot de passe incorrect'], 401);
		}
			
	}

	// Renvoie l'utilisateur connecté
	public function info() {
    	return Auth::user();
    }
}