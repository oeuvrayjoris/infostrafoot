<?php 
namespace App;
  
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;
  
class Player extends Model implements Authenticatable {

	use AuthenticableTrait;

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
        'api_key'
    ];
    protected $hidden = [
    	'password'
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