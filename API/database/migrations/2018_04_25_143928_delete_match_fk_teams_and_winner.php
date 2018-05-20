<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DeleteMatchFkTeamsAndWinner extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('matches', function (Blueprint $table) {
            $table->dropForeign(['matches_teams_id_team1']);
            $table->dropForeign(['matches_teams_id_team2']);
            $table->dropForeign(['matches_teams_id_winner']);
            $table->dropColumn(['id_team1']);
            $table->dropColumn(['id_team2']);
            $table->dropColumn(['id_winner']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('matches', function (Blueprint $table) {
            $table->unsignedInteger('id_team1');
            $table->unsignedInteger('id_team2');
            $table->unsignedInteger('id_winner');
            $table->foreign('id_team1')
                ->references('id')->on('teams')
                ->onDelete('cascade');
            $table->foreign('id_team2')
                ->references('id')->on('teams')
                ->onDelete('cascade');
            $table->foreign('id_winner')
                ->references('id')->on('teams')
                ->onDelete('cascade');
        });
    }
}