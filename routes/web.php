<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PortfolioController;

Route::view('/', 'home')->name('home');

Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.store');
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.store');
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
});
