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
}

?>