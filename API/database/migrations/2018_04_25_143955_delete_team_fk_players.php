<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DeleteTeamFkPlayers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('teams', function (Blueprint $table) {
            $table->dropForeign(['teams_players_id_player1']);
            $table->dropForeign(['teams_players_id_player2']);
            $table->dropColumn(['id_player1']);
            $table->dropColumn(['id_player2']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('teams', function (Blueprint $table) {
            $table->unsignedInteger('id_player1');
            $table->unsignedInteger('id_player2');
            $table->foreign('id_player1')
                ->references('id')->on('players')
                ->onDelete('cascade');
            $table->foreign('id_player2')
                ->references('id')->on('players')
                ->onDelete('cascade');
        });
    }
}