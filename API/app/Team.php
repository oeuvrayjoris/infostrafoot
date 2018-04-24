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
    	'name',
    	'id_player1',
    	'id_player2'
    ];

    /**
     * Get the players for the team.
     */
    public function players()
    {
        return $this->hasMany('App\Player');
    }

    /**
     * Get the matches that owns the team.
     */
    public function matches()
    {
        return $this->belongsToMany('App\Match');
    }
}

?>