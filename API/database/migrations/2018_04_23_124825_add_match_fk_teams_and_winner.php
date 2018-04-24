<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMatchFkTeamsAndWinner extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
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

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('matches', function (Blueprint $table) {
            $table->dropForeign(['id_team1']);
            $table->dropForeign(['id_team2']);
            $table->dropForeign(['id_winner']);
        });
    }
}
