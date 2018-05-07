<?php

namespace App\Http\Controllers;

use App\Player;
use App\Team;
use App\Match;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;
use DB;

class PlayerController extends Controller
{
	public function __construct() {
		$this->middleware('auth', ['only' => [
			'info',
			'updatePlayer',
			'deletePlayer',
		]]);
	}

	/* Get all players */
	public function index() {
		$players = Player::all();
		foreach ($players as $player) {
			$player->goals;
			$player->teams;
		}
		return response()->json($players, 200);
	}

	/* Get player by id */
	public function getPlayer($id){
		$player = Player::find($id);
		if (!$player) {
			return response()->json([
				"status"=>"error",
				"message"=>"Le joueur n'existe pas."
			], 404);
		}
		$goals = $player->goals;
		$teams = $player->teams;
		foreach ($teams as $team) {
			$team->players;
		}

		$played_matches_count = Match::join('match_team', 'matches.id', '=', 'match_team.match_id')
			->join('teams', 'match_team.team_id', '=', 'teams.id')
			->join('team_player', 'teams.id', '=', 'team_player.team_id')
			->join('players', 'team_player.player_id', '=', 'players.id')
			->where('players.id', $player->id)
			->select('matches.*')
			->distinct()
			->get()
			->count();

		$victories_count = Match::join('match_team', 'matches.id', '=', 'match_team.match_id')
			->join('teams', 'match_team.team_id', '=', 'teams.id')
			->join('team_player', 'teams.id', '=', 'team_player.team_id')
			->join('players', 'team_player.player_id', '=', 'players.id')
			->where([
				['players.id', $player->id],
				['match_team.winner', 1],
			])
			->select('matches.*')
			->distinct()
			->get()
			->count();

		$best_teams = Team::join('match_team', 'teams.id', '=', 'match_team.team_id')
			->join('team_player', 'team_player.team_id', '=', 'teams.id')
			->where([
				['team_player.player_id', $player->id],
				['match_team.winner', 1],
			])
			->select('id', 'name', DB::raw('count(*) as victories_count'))
			->groupBy("teams.id")
			->orderBy("victories_count", 'desc')
			->limit(3)
			->get();

		foreach ($best_teams as $team) {
			$team->players;
		}

		return response()->json([
			"player" => $player,
			"goals_count" => count($goals),
			"gamelles_count" => count($goals->where("gamelle", 1)),
			"played_matches_count" => $played_matches_count,
			"victories_count" => $victories_count,
			"defeats_count" => $played_matches_count - $victories_count,
			"best_teams" => $best_teams,
		], 200);
	}

	/* Search player by username, firstname or lastname */
	public function searchPlayers(Request $request){
		$this->validate($request, [
			'value' => 'required',
		]);
		$value = $request->input('value');
		$players = Player::where('username', 'like', '%'.$value.'%')
			->orWhere('firstname', 'like', '%'.$value.'%')
			->orWhere('lastname', 'like', '%'.$value.'%')
			->orWhere(DB::raw('CONCAT(firstname, " ", lastname)'), 'like', '%'.$value.'%')
			->orWhere(DB::raw('CONCAT(lastname, " ", firstname)'), 'like', '%'.$value.'%')
			->get();

		if (count($players) == 0) {
			return response()->json([
				"status"=>"error",
				"message"=>"Aucun joueur ne correspond à votre recherche"
			], 404);
		}
		
		return response()->json([
			"players" => $players,
		], 200);
	}

	/* Create a player */
	public function createPlayer(Request $request) {
		$this->validate($request, [
			'photo' => 'image|mimes:jpeg,jpg,png,gif,svg|max:2048',
			'mail' => 'email',
		]);

		// Check if username is available
		$username = $request->input('username');
		if (Player::isUsernameAvailable($username)) {
			$player = Player::create($request->all());
			$player->password = Hash::make($request->input('password'));
			if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
				/* upload picture */
				$fileName = time().'.'.$request->photo->extension();
				$destinationPath = base_path('public/uploads');
				$request->file('photo')->move($destinationPath, $fileName);
				$player->photo = $request->root()."/uploads/".$fileName;
			} else {
				/* default picture */
				$player->photo = $request->root()."/uploads/user_default.png";
			}
			$player->role = "player";
			$player->save();
			return response()->json($player, 200);
		} else {
			return response()->json([
				'status' => 'fail', 
				'message' => "Ce nom d'utilisateur existe déjà."
			], 409);
		}
	}
	
	/* Update a player by id */
	public function updatePlayer(Request $request, $id) {
		// On récupère le joueur correspondant à l'id en paramètre
		$player = Player::find($id);

		// On vérifie que l'utilisateur modifie sa propre page
		if ($player != Auth::user()) {
			return response()->json(['status' => 'fail', 'message' => "Vous n'avez pas les droits pour effectuer cette modification."], 401);
		}

		$this->validate($request, [
			'photo' => 'image|mimes:jpeg,jpg,png,gif,svg|max:2048',
		]);

		/* Update informations */

		// Check if username is available
		$username = $request->input('username');
		if (Player::isUsernameAvailable($username)) {
			if ($request->input('username')) 
				$player->username = $request->input('username');
		}
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

		if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
			/* upload picture */
			$fileName = time().'.'.$request->photo->extension();
			$destinationPath = base_path('public/uploads');
			$request->file('photo')->move($destinationPath, $fileName);
			$player->photo = $request->root()."/uploads/".$fileName;
		}

		// Saving the player
		$player->save();

		// Return the modified player
		return response()->json($player, 200);
	}

	/* Delete Player */
	public function deletePlayer($id) {
		// On récupère le joueur correspondant à l'id en paramètre 
		$player = Player::find($id);

		// On vérifie que l'utilisateur supprime sa propre page (sinon : message d'erreur)
		if ($player != Auth::user() && Auth::user()->role != "admin") {
			return response()->json(['status' => 'fail', 'message' => "Vous n'avez pas les droits pour supprimer cet utilisateur."], 401);
		}

		// Suppression du joueur
		$player->delete();

		// On renvoie un message de validation 
		return response()->json(['status' => 'success', 'message' => "Le profil a bien été supprimé."], 200);
	}

	/* Return the connected player */
	public function info() {
		return response()->json(Auth::user(), 200);
	}

	/* Return the teams for the player with id = $id */
	public function getTeamsByPlayer($id) {
		$player = Player::find($id);
		$teams = $player->teams;
		return response()->json($teams, 200);
	}

	public function getMatchesByPlayer($id) {
		$matches = Match::join('match_team', 'matches.id', '=', 'match_team.match_id')
		    ->join('teams', 'match_team.team_id', '=', 'teams.id')
		    ->join('team_player', 'teams.id', '=', 'team_player.team_id')
		    ->join('players', 'team_player.player_id', '=', 'players.id')
		    ->where('players.id', $id)->get();
		return response()->json($matches, 200);
	}
}