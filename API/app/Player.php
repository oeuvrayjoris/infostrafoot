<?php 
namespace App;
  
use Illuminate\Database\Eloquent\Model;
  
class Player extends Model {

    protected $fillable = [
    	'username',
    	'password',
    	'firstname',
    	'lastname',
    	'birthdate',
    	'mail',
    ];
}

?>