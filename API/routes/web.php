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
$router->get('/search/player','PlayerController@searchPlayer');

/*
|----------------
| Player routes
|----------------
*/
$router->get('players','PlayerController@index');
$router->group(['prefix' => 'player'], function($router) {
	$router->get('/{id}','PlayerController@getPlayer');
	$router->post('/','PlayerController@createPlayer');
	$router->put('/{id}','PlayerController@updatePlayer'); // Auth
	$router->delete('/{id}','PlayerController@deletePlayer'); // Auth
});


/*
|----------------
| Match routes
|----------------
*/
$router->get('matches','MatchController@index');
$router->get('match/{id}','MatchController@getMatch');
$router->post('match','MatchController@createMatch'); // Need Auth
$router->delete('match/{id}','MatchController@deleteMatch'); // Need Auth


/*
|----------------
| Team routes
|----------------
*/
$router->get('teams','TeamController@index');
$router->get('team/{id}','TeamController@getTeam');
$router->post('team','TeamController@createTeam');
$router->put('team/{id}','TeamController@updateTeam');
$router->delete('team/{id}','TeamController@deleteTeam');
$router->get('player/{id}/teams','TeamController@getTeamsbyPlayer');


/*
|----------------
| Goals routes
|----------------
*/
$router->get('goals','GoalController@index');
$router->post('goal','GoalController@createGoal');
$router->delete('goal/{id}','GeamController@deleteGeam');