@extends('auth.layout')
@section('title', 'Sign in')
@section('body-class', 'login-page')
@section('brand')
    <p class="brand"><span class="brand-mark" aria-hidden="true">E</span><span class="brand-copy">EverLeaf<small>PORTFOLIO GENERATOR</small></span></p>
@endsection
@section('styles')
    <style>
        .login-page{position:relative;isolation:isolate;overflow-x:hidden;padding:34px 0;background:#09150f;background-image:linear-gradient(90deg,#06110bc7 0%,#07120b8c 48%,#06110bb8 100%),linear-gradient(180deg,#06110b44 0%,#06110b70 100%),url('https://images.unsplash.com/photo-1546835196-5fe79a546d7c?auto=format&fit=crop&w=2200&q=80');background-position:center,center,center 48%;background-size:cover;background-attachment:fixed;color:#f8f4df}
        .login-page:before{position:fixed;z-index:-1;inset:0;content:"";pointer-events:none;background-image:url('/images/login-foliage.svg'),linear-gradient(92deg,transparent 5%,#050d0a8c 9%,transparent 16%,transparent 83%,#07100b99 89%,transparent 96%),repeating-linear-gradient(88deg,transparent 0 12%,#07100a42 12.2% 12.7%,transparent 13% 24%),radial-gradient(ellipse at 4% 0%,#b5c87990 0 5%,transparent 17%),radial-gradient(ellipse at 96% 2%,#b5c8797a 0 5%,transparent 17%),radial-gradient(ellipse at 4% 100%,#9dad6688 0 8%,transparent 20%),radial-gradient(ellipse at 96% 100%,#a5b87170 0 7%,transparent 19%);background-size:cover;opacity:.95}
        .login-page:after{position:fixed;z-index:-1;inset:15px;content:"";pointer-events:none;border:1px solid #c6ce9b66;border-radius:13px;box-shadow:inset 0 0 42px #030a0670,0 0 25px #bdd08b18}
        .login-page .card{position:relative;z-index:0;width:min(100% - 38px,420px);padding:30px 34px 25px;border:1px solid #d1d9a45c;border-radius:20px;background:linear-gradient(145deg,#14271de8 0%,#102018df 55%,#0a1712ed 100%);box-shadow:0 34px 90px #020704c9,0 12px 28px #0207048c,0 0 0 6px #b7c78312,inset 0 1px 0 #f2f4d12b;color:#f7f3df;backdrop-filter:blur(14px) saturate(1.2);transform:translateY(-5px)}
        .login-page .card:before{position:absolute;z-index:-1;inset:-2px;content:"";border:1px solid #d2dfa52b;border-radius:22px;box-shadow:0 0 36px #a4bd6520;pointer-events:none}
        .login-page .brand{justify-content:center;gap:10px;margin:0 0 22px;color:#f0e9c9;font-size:18px;letter-spacing:-.025em}.login-page .brand-mark{width:37px;height:37px;border:1px solid #d5dca16b;border-radius:13px;background:linear-gradient(145deg,#829957,#405d32);color:#fcf4d4;font-size:20px;box-shadow:0 4px 14px #050a05}
        .brand-copy{display:grid;line-height:1.12}.brand-copy small{margin-top:5px;color:#c4c49d;font-size:10px;font-weight:500;letter-spacing:.035em}
        .login-page .card h1{margin:0 0 3px;text-align:center;color:#f6efd7;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:500;letter-spacing:-.035em}.login-page .muted{margin:0 0 22px;text-align:center;color:#d0d0b6;font-size:13px}
        .login-page .field{position:relative;display:block;margin:12px 0}.login-page .field label{display:block;margin:0 0 5px 38px;color:#dbd8be;font-size:11px;font-weight:600}.input-wrap{position:relative}.input-icon{position:absolute;top:50%;left:13px;width:17px;height:17px;transform:translateY(-50%);color:#cad09b;pointer-events:none}.login-page .field input{height:43px;padding:10px 42px 10px 39px;border:1px solid #c6d0a133;border-radius:11px;background:#f1f2d20d;color:#fffbe9;font-size:13px;box-shadow:inset 0 1px 4px #03080548}.login-page .field input::placeholder{color:#c1c3aa99}.login-page .field input:focus{border-color:#b2c77d;box-shadow:0 0 0 3px #9db36c28;outline:0}.login-page .field input:-webkit-autofill,.login-page .field input:-webkit-autofill:hover,.login-page .field input:-webkit-autofill:focus{-webkit-text-fill-color:#fffbe9;caret-color:#fffbe9;-webkit-box-shadow:0 0 0 1000px #1a2c20 inset;transition:background-color 99999s ease-in-out 0s}.password-toggle{position:absolute;top:50%;right:11px;display:grid;width:28px;height:28px;place-items:center;transform:translateY(-50%);border:0;border-radius:7px;background:transparent;color:#c6cba7;cursor:pointer}.password-toggle:hover{background:#ffffff12;color:#fff}.password-toggle svg{width:17px;height:17px}
        .login-options{display:flex;align-items:center;gap:10px;margin:13px 1px 17px;color:#dedfc6;font-size:11px}.login-page .remember{gap:7px;margin:0;color:inherit;font-size:11px;cursor:pointer}.login-page .remember input{width:14px;height:14px;margin:0;accent-color:#8fa95e}
        .login-page .login-options{justify-content:space-between}.login-page .forgot-link{color:#d6dfa9;text-decoration:underline;text-underline-offset:3px;font-size:11px}.login-page .forgot-link:hover{color:#f2f4d5;text-shadow:0 0 12px #c5df8d8a}
        .login-page .button{min-height:42px;margin:0;border:1px solid #d6e2a034;border-radius:11px;background:linear-gradient(180deg,#88a65a,#668644);color:#fffced;font-size:14px;box-shadow:0 6px 18px #03080655, inset 0 1px #ffffff36;transition:filter .16s,transform .16s}.login-page .button:hover{background:linear-gradient(180deg,#96b365,#73964d);filter:brightness(1.04);transform:translateY(-1px)}.login-page .button:focus-visible,.login-page a:focus-visible,.password-toggle:focus-visible{outline:3px solid #c8d990;outline-offset:3px}
        .login-page .switch{margin:20px 0 0;color:#d5d4be;font-size:11px}.login-page .switch a{color:#d6dfa9;text-decoration:underline;text-underline-offset:3px}.login-page .errors{border:1px solid #e8aaa66b;background:#411b18cc;color:#ffddcf;font-size:13px}.login-page .notice{border:1px solid #c8df9c66;background:#283e24;color:#e5f1c6;font-size:13px}
        @media(max-width:520px){.login-page{padding:24px 0}.login-page:after{inset:8px}.login-page .card{width:min(100% - 34px,420px);padding:27px 23px 23px;transform:none}.login-page .card h1{font-size:27px}}
        @media(prefers-reduced-motion:reduce){.login-page .button{transition:none}}
    </style>
@endsection
@section('content')
<h1>Welcome Back</h1><p class="muted">Sign in to manage your portfolio.</p>
<form method="POST" action="{{ route('login.store') }}">
    @csrf
    @if($templateKey ?? false)<input type="hidden" name="next_template" value="{{ $templateKey }}">@endif
    <div class="field"><label for="email">Email address</label><div class="input-wrap"><svg class="input-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="m5 7 7 5.5L19 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg><input id="email" type="email" name="email" value="{{ old('email') }}" autocomplete="email" placeholder="you@example.com" required></div></div>
    <div class="field"><label for="password">Password</label><div class="input-wrap"><svg class="input-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4.5" y="10" width="15" height="10" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10m-4 4v2.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg><input id="password" type="password" name="password" autocomplete="current-password" placeholder="Enter your password" required><button class="password-toggle" type="button" aria-label="Show password" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.5 12s3.3-6 9.5-6 9.5 6 9.5 6-3.3 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.7"/></svg></button></div></div>
    <div class="login-options"><label class="remember"><input type="checkbox" name="remember" value="1"> Remember me</label><a class="forgot-link" href="{{ route('password.request') }}">Forgot password?</a></div>
    <button class="button" type="submit">Sign In</button>
</form>
<p class="switch">Don’t have an account? <a href="{{ route('register', ($templateKey ?? false) ? ['template' => $templateKey] : []) }}">Create one</a></p>
<script>
    document.querySelector('.password-toggle')?.addEventListener('click', function () {
        const password = document.getElementById('password');
        const show = password.type === 'password';
        password.type = show ? 'text' : 'password';
        this.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
        this.setAttribute('aria-pressed', String(show));
    });
</script>
@endsection
