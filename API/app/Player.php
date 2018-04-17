<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Support\Facades\DB;

class Player extends Model implements AuthenticatableContract, AuthorizableContract {

	use Authenticatable, Authorizable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'username',
		'firstname',
		'lastname',
		'birthdate',
		'mail',
	];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = [
		'password',
		'api_token'
	];

	/* Check if username is available (return true if available) */
	static public function isUsernameAvailable($username) {
		return DB::table('players')->where('username', $username)->doesntExist();
	}

}
?>