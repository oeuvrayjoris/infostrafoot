<?php 
namespace App;
  
use Illuminate\Database\Eloquent\Model;
  
class Team extends Model {

	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
    	'name'
    ];

    /**
     * Get the players for the team.
     */
    public function players()
    {
        return $this->belongsToMany('App\Player', 'team_player')->withTimestamps();
    }

    /**
     * Get the matches that owns the team.
     */
    public function matches()
    {
        return $this->belongsToMany('App\Match', 'match_team')->withTimestamps();
    }
}

?>