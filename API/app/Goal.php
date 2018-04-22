<?php 
namespace App;
  
use Illuminate\Database\Eloquent\Model;
  
class Goal extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'number',
		'gamelle',
		'own_goal',
		'role',
		'player_id',
		'match_id',
	];

	/**
	 * Get the Player that owns the goal.
	 */
	public function player()
	{
		return $this->belongsTo('App\Player');
	}

	/**
	 * Get the Match that owns the goal.
	 */
	public function match()
	{
		return $this->belongsTo('App\Match');
	}
}

?>