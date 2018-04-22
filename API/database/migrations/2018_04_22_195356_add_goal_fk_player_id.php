<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddGoalFkPlayerId extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('goals', function (Blueprint $table) {
            $table->unsignedInteger('player_id');
            $table->foreign('player_id')
            	->references('id')->on('players')
            	->onDelete('cascade');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('goals', function (Blueprint $table) {
			$table->dropForeign(['player_id']);
        });
	}
}
