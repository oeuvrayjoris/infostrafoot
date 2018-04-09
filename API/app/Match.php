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
    ];
}

?>