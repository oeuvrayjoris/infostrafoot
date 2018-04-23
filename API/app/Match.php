<?php 
namespace App;

use Illuminate\Database\Eloquent\Model;

class Match extends Model {

	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
    	'begin_time',
        'end_time',
        'id_team1',
        'id_team2',
        'winner'
    ];

	/**
	 * Get the goals for the match.
	public function goals()
	 */
	{
		return $this->hasMany('App\Goal');
	}
}

?>