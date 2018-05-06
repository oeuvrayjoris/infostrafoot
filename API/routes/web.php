<?php

use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () {
	return "API Infostrafoot";
});


// Effectuer les migrations sans ligne de commande
$router->get('/migrate', function () {
	$migrate = Artisan::call('migrate', array('--path' => 'database/migrations', '--force' => true));
	echo $migrate;
	return "Migration effectuée";
});


/*
|----------------
| Auth routes
|----------------
*/
$router->group(['prefix' => 'auth'], function($router) {
	$router->post('/login', 'AuthController@login');
	$router->post('/logout', 'AuthController@logout');
	$router->get('/player','PlayerController@info'); // Auth
});

/*
|----------------
| Home routes
|----------------
*/
$router->get('/home','HomeController@index');

/*
|----------------
| search routes
|----------------
*/
$router->get('/search/players','PlayerController@searchPlayers');

/*
|----------------
| Player routes
|----------------
*/
$router->group(['prefix' => 'players'], function($router) {
	$router->get('/','PlayerController@index');
	$router->get('/{id}','PlayerController@getPlayer');
	$router->post('/','PlayerController@createPlayer');
	$router->post('/{id}','PlayerController@updatePlayer'); // Auth
	$router->delete('/{id}','PlayerController@deletePlayer'); // Auth
	$router->get('/{id}/teams','PlayerController@getTeamsByPlayer');
	$router->get('/{id}/matches','PlayerController@getMatchesByPlayer');
});


/*
|----------------
| Match routes
|----------------
*/
$router->group(['prefix' => 'matches'], function($router) {
	$router->get('/','MatchController@index');
	$router->get('/{id}','MatchController@getMatch');
	$router->post('/','MatchController@createMatch'); // Need Auth
	$router->delete('/{id}','MatchController@deleteMatch'); // Need Auth
});


/*
|----------------
| Team routes
|----------------
*/
$router->group(['prefix' => 'teams'], function($router) {
	$router->get('/','TeamController@index');
	$router->get('/{id}','TeamController@getTeam');
	$router->post('/','TeamController@createTeam');
	$router->put('/{id}','TeamController@updateTeam');
	$router->delete('/{id}','TeamController@deleteTeam');
});


/*
|----------------
| Goals routes
|----------------
*/
$router->group(['prefix' => 'goals'], function($router) {
	$router->get('/','GoalController@index');
	$router->post('/','GoalController@createGoal');
	$router->delete('/{id}','GoalController@deleteGoal');
});