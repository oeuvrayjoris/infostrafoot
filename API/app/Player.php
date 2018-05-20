<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Player extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject {

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
		'photo'
	];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = [
		'password',
		'role'
	];

	/**
     * Check if username is available (return true if available) 
     */
	static public function isUsernameAvailable($username) {
		return DB::table('players')->where('username', $username)->doesntExist();
	}

	/**
     * Get the goals for the player.
     */
    public function goals()
    {
        return $this->hasMany('App\Goal');
    }

    /**
	 * Get the teams that owns the player.
	 */
	public function teams()
	{
		return $this->belongsToMany('App\Team', 'team_player')->withTimestamps();
	}

	/**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
?>