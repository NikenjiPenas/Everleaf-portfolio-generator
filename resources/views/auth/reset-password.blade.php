@extends('auth.layout')
@section('title', 'Choose a new password')
@section('body-class', 'login-page recovery-page')
@section('brand')
    <p class="brand"><span class="brand-mark" aria-hidden="true">E</span><span class="brand-copy">EverLeaf<small>PORTFOLIO GENERATOR</small></span></p>
@endsection
@section('styles')
    <style>
        .recovery-page .card h1{font-size:27px}.recovery-page .muted{line-height:1.6}.recovery-page .switch{margin-top:17px}
    </style>
@endsection
@section('content')
<h1>Choose a new password</h1>
<p class="muted">Use at least 8 characters. Your password stays private and is stored securely as a hash.</p>
<form method="POST" action="{{ route('password.update') }}">
    @csrf
    <input type="hidden" name="token" value="{{ $token }}">
    <div class="field"><label for="email">Email address</label><div class="input-wrap"><svg class="input-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="m5 7 7 5.5L19 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg><input id="email" type="email" name="email" value="{{ old('email', $email) }}" autocomplete="email" required></div></div>
    <div class="field"><label for="password">New password</label><div class="input-wrap"><svg class="input-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4.5" y="10" width="15" height="10" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg><input id="password" type="password" name="password" autocomplete="new-password" minlength="8" required></div></div>
    <div class="field"><label for="password_confirmation">Confirm new password</label><div class="input-wrap"><svg class="input-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4.5" y="10" width="15" height="10" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg><input id="password_confirmation" type="password" name="password_confirmation" autocomplete="new-password" minlength="8" required></div></div>
    <button class="button" type="submit">Save new password</button>
</form>
<p class="switch"><a href="{{ route('login') }}">Back to sign in</a></p>
@endsection
