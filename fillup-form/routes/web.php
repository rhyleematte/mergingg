<?php

use App\Http\Controllers\UserEntryController;

Route::get('/', [UserEntryController::class, 'index']);
Route::resource('users', UserEntryController::class);

