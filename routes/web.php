<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\PasswordResetController;

Route::view('/', 'welcome')->name('welcome');
Route::view('/home', 'home')->name('home');

Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.store');
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.store');
Route::get('/forgot-password', [PasswordResetController::class, 'requestForm'])->name('password.request');
Route::post('/forgot-password', [PasswordResetController::class, 'sendLink'])->middleware('throttle:5,1')->name('password.email');
Route::get('/reset-password/{token}', [PasswordResetController::class, 'resetForm'])->name('password.reset');
Route::post('/reset-password', [PasswordResetController::class, 'reset'])->middleware('throttle:5,1')->name('password.update');
Route::view('/signed-out', 'auth.signed-out')->name('auth.signed-out');
Route::get('/p/{slug}', [PortfolioController::class, 'publicPage'])->name('portfolios.public');
Route::get('/template-demo/{template}', [PortfolioController::class, 'demoPreview'])
    ->where('template', 'modern|minimal|creative')->name('templates.demo');

Route::middleware('auth')->group(function (): void {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/portfolios', [PortfolioController::class, 'index'])->name('portfolios.index');
    Route::get('/portfolios/create', [PortfolioController::class, 'create'])->name('portfolios.create');
    Route::post('/portfolios', [PortfolioController::class, 'store'])->name('portfolios.store');
    Route::get('/portfolios/{portfolio}/templates', [PortfolioController::class, 'templates'])
        ->whereNumber('portfolio')->name('portfolios.templates');
    Route::get('/portfolios/{portfolio}/preview/{template}', [PortfolioController::class, 'preview'])
        ->whereNumber('portfolio')->where('template', 'modern|minimal|creative')->name('portfolios.preview');
    Route::post('/portfolios/{portfolio}/template', [PortfolioController::class, 'selectTemplate'])
        ->whereNumber('portfolio')->name('portfolios.template.update');
    Route::post('/portfolios/{portfolio}/publish', [PortfolioController::class, 'togglePublished'])
        ->whereNumber('portfolio')->name('portfolios.publish');
    Route::get('/portfolios/{portfolio}/edit', [PortfolioController::class, 'edit'])->whereNumber('portfolio')->name('portfolios.edit');
    Route::put('/portfolios/{portfolio}', [PortfolioController::class, 'update'])->whereNumber('portfolio')->name('portfolios.update');
    Route::delete('/portfolios/{portfolio}', [PortfolioController::class, 'destroy'])->whereNumber('portfolio')->name('portfolios.destroy');
    Route::post('/portfolios/{portfolio}/restore', [PortfolioController::class, 'restore'])->whereNumber('portfolio')->name('portfolios.restore');
});
