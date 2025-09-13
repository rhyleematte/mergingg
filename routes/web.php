<?php

use App\Http\Controllers\UserEntryController;
use Illuminate\Support\Facades\Route;

// Homepage -> Dashboard
Route::get('/', [UserEntryController::class, 'index'])->name('dashboard');

// Resource routes for users
Route::resource('users', UserEntryController::class);
