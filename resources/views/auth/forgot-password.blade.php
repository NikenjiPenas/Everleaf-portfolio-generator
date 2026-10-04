@extends('auth.layout')
@section('title', 'Recover your account')
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
<h1>Recover your account</h1>
<p class="muted">Enter the email on your account. We’ll send a secure password reset link if it matches.</p>
<form method="POST" action="{{ route('password.email') }}">
    @csrf
    <div class="field"><label for="email">Email address</label><div class="input-wrap"><svg class="input-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="m5 7 7 5.5L19 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg><input id="email" type="email" name="email" value="{{ old('email') }}" autocomplete="email" placeholder="you@example.com" required></div></div>
    <button class="button" type="submit">Send reset link</button>
</form>
<p class="switch"><a href="{{ route('login') }}">Back to sign in</a></p>
@endsection
