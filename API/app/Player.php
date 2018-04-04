<?php 
namespace App;
  
use Illuminate\Database\Eloquent\Model;
  
class Player extends Model {

	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
    	'username',
    	'password',
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
    ];
}

?>