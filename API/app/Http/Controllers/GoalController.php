<?php

namespace App\Http\Controllers;

use App\Goal;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GoalController extends Controller
{
	// Get all goals
	public function index(){
		$goals  = Goal::all();
		return response()->json($goals, 200);
	}

	// Get goal by id
	public function getGoal($id){
		$goal = Goal::find($id);
		return response()->json($goal, 200);
	}

	// Create a goal (POST)
	public function createGoal(Request $request){
		$goal = Goal::create($request->all());
		return response()->json($goal, 200);
    }

	public function deleteGoal($id){
		$goal = Goal::find($id);
		$goal->delete();
		return response()->json('deleted', 200);
	}
}
