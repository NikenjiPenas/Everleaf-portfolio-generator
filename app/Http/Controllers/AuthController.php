<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Models\User;
use Illuminate\Cache\RateLimiter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;

class AuthController extends Controller
{
    public function showRegister(Request $request): View|RedirectResponse
    {
        $templateKey = in_array($request->query('template'), ['modern', 'minimal', 'creative'], true)
            ? $request->query('template')
            : null;

        return Auth::check()
            ? redirect()->route($templateKey ? 'portfolios.create' : 'portfolios.index', $templateKey ? ['template' => $templateKey] : [])
            : view('auth.register', compact('templateKey'));
    }

    public function register(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'next_template' => ['nullable', 'in:modern,minimal,creative'],
        ]);

        $templateKey = $data['next_template'] ?? null;
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);
        Auth::login($user);
        $request->session()->regenerate();

        // In local development, attach the portfolio created before sign-in to this account.
        if (app()->environment('local')) {
            Portfolio::query()->whereNull('user_id')->update(['user_id' => $user->id]);
        }

        return redirect()->route($templateKey ? 'portfolios.create' : 'portfolios.index', $templateKey ? ['template' => $templateKey] : [])
            ->with('success', 'Your account is ready.');
    }

    public function showLogin(Request $request): View|RedirectResponse
    {
        $templateKey = in_array($request->query('template'), ['modern', 'minimal', 'creative'], true)
            ? $request->query('template')
            : null;

        return Auth::check()
            ? redirect()->route($templateKey ? 'portfolios.create' : 'portfolios.index', $templateKey ? ['template' => $templateKey] : [])
            : view('auth.login', compact('templateKey'));
    }

    public function login(Request $request, RateLimiter $limiter): RedirectResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'next_template' => ['nullable', 'in:modern,minimal,creative'],
        ]);
        $templateKey = $data['next_template'] ?? null;
        $key = Str::lower($data['email']).'|'.$request->ip();

        if ($limiter->tooManyAttempts($key, 5)) {
            throw ValidationException::withMessages([
                'email' => 'Too many sign-in attempts. Please wait a minute and try again.',
            ]);
        }

        if (! Auth::attempt(['email' => $data['email'], 'password' => $data['password']], $request->boolean('remember'))) {
            $limiter->hit($key, 60);
            throw ValidationException::withMessages(['email' => 'These sign-in details do not match our records.']);
        }

        $limiter->clear($key);
        $request->session()->regenerate();

        return $templateKey
            ? redirect()->route('portfolios.create', ['template' => $templateKey])
            : redirect()->intended(route('portfolios.index'));
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('auth.signed-out');
    }
}
