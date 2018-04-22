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
        'role'
    ];
}

?>