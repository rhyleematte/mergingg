<?php

namespace App\Http\Controllers;

use App\Models\UserEntry;
use Illuminate\Http\Request;

class UserEntryController extends Controller
{
    public function index()
    {
        $users = UserEntry::all();
        return view('dashboard', compact('users'));
    }

    public function create()
    {
        return view('create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer',
            'email' => 'required|email|unique:user_entries,email',
            'birthday' => 'required|date',
        ]);

        UserEntry::create($request->all());
        return redirect()->route('users.index')->with('success', 'User added successfully!');
    }

    public function edit(UserEntry $user)
    {
        return view('edit', compact('user'));
    }

    public function update(Request $request, UserEntry $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer',
            'email' => 'required|email|unique:user_entries,email,' . $user->id,
            'birthday' => 'required|date',
        ]);

        $user->update($request->all());
        return redirect()->route('users.index')->with('success', 'User updated successfully!');
    }

    public function destroy(UserEntry $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully!');
    }
}
