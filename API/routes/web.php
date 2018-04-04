<?php

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

$router->get('/date', function () {
	return "Aujourd'hui : " . date('d-m-Y');
});

/*
|----------------
| Player routes
|----------------
*/
$router->get('players','PlayerController@index');
$router->get('player/{id}','PlayerController@getPlayer');
$router->post('player','PlayerController@createPlayer');
// TODO : Authentification nécessaire pour les routes 'put' et 'delete' -> MiddleWare ? Vérification dans le Controller ?
$router->put('player/{id}','PlayerController@updatePlayer');
$router->delete('player/{id}','PlayerController@deletePlayer');

/*
|----------------
| Match routes
|----------------
*/
$router->get('matches','MatchController@index');
$router->post('match','MatchController@createMatch');

