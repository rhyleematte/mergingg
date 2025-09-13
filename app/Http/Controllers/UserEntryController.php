<?php

namespace App\Http\Controllers;

use App\Models\UserEntry;
use Illuminate\Http\Request;

class UserEntryController extends Controller
{
    /**
     * Show dashboard (Blade) or return JSON
     */
    public function index(Request $request)
    {
        $users = UserEntry::all();

        if ($request->wantsJson()) {
            return response()->json($users);
        }

        return view('dashboard', compact('users'));
    }

    /**
     * Show create form
     */
    public function create()
    {
        return view('create');
    }

    /**
     * Store new user (works for API + Blade)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'age'      => 'required|integer',
            'email'    => 'required|email|unique:user_entries,email',
            'birthday' => 'required|date',
        ]);

        $user = UserEntry::create($validated);

        if ($request->wantsJson()) {
            return response()->json($user, 201);
        }

        return redirect()->route('dashboard')->with('success', 'User added successfully!');
    }

    /**
     * Show edit form
     */
    public function edit(UserEntry $user)
    {
        return view('edit', compact('user'));
    }

    /**
     * Update user
     */
    public function update(Request $request, UserEntry $user)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'age'      => 'required|integer',
            'email'    => 'required|email|unique:user_entries,email,' . $user->id,
            'birthday' => 'required|date',
        ]);

        $user->update($validated);

        if ($request->wantsJson()) {
            return response()->json($user);
        }

        return redirect()->route('dashboard')->with('success', 'User updated successfully!');
    }

    /**
     * Delete user
     */
    public function destroy(Request $request, UserEntry $user)
    {
        $user->delete();

        if ($request->wantsJson()) {
            return response()->json(null, 204);
        }

        return redirect()->route('dashboard')->with('success', 'User deleted successfully!');
    }
}
