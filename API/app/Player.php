<?php 
namespace App;
  
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;
  
class Player extends Model implements Authenticatable {

	use AuthenticableTrait;

    protected $fillable = [
    	'username',
    	'firstname',
    	'lastname',
    	'birthdate',
    	'mail',
        'api_key'
    ];
    protected $hidden = [
    	'password'
    ];
}
?>