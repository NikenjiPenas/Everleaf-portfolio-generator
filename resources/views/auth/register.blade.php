@extends('auth.layout')
@section('title', 'Create account')
@section('body-class', 'register-page')
@section('styles')
    <style>
        .register-page{min-height:100vh;padding:28px 0;background:#07130e url('https://images.unsplash.com/photo-1687178151530-883e1495b4aa?auto=format&fit=crop&w=2200&q=80') center 54%/cover fixed no-repeat;color:#f5f2df}
        .register-page .card{position:relative;width:min(100% - 36px,460px);padding:32px 36px 28px;border:1px solid #e4edcf91;border-radius:20px;background:linear-gradient(145deg,rgba(19,43,28,.72),rgba(7,24,16,.64));box-shadow:0 34px 90px #000b,0 0 0 6px #c6d89d13,inset 0 1px #f5f4dc55;color:#f5f2df;backdrop-filter:blur(22px) saturate(1.5);-webkit-backdrop-filter:blur(22px) saturate(1.5)}
        .register-page .brand{color:#f1eedb}.register-page .brand-mark{border:1px solid #d7e5b878;background:linear-gradient(145deg,#9ab66d,#45623d);color:#102016;box-shadow:0 5px 18px #0005}.register-page .card h1{color:#f4f0dc}.register-page .muted{color:#d1dac9}
        .register-page .field label{color:#e2e7d4}.register-page .field input{min-height:45px;border:1px solid #d5e0c43d;border-radius:11px;background:#f3f4df10;color:#fffced;box-shadow:inset 0 1px 5px #0004}.register-page .field input:focus{border-color:#b5ce83;box-shadow:0 0 0 3px #a9c87838;outline:0}.register-page .button{min-height:46px;border:1px solid #d7e5ad6b;border-radius:11px;background:linear-gradient(180deg,#91ad62,#638342);color:#fffced;box-shadow:0 9px 24px #0005,inset 0 1px #fff5}.register-page .button:hover{background:linear-gradient(180deg,#a0bc6e,#73964e)}.register-page .switch{color:#d0d9c8}.register-page .switch a{color:#d7e6ae;text-decoration:underline;text-underline-offset:3px}.register-page .errors{border-color:#e8aaa66b;background:#411b18ed;color:#ffddcf}.register-page .notice{border-color:#c8df9c66;background:#283e24;color:#e5f1c6}
        @media(max-width:520px){.register-page{padding:16px 0}.register-page .card{width:min(100% - 26px,460px);padding:25px 22px 22px}}
    </style>
@endsection
@section('content')
<h1>Create your account</h1><p class="muted">Sign up to manage and publish your portfolio.</p>
<form method="POST" action="{{ route('register.store') }}">
    @csrf
    @if($templateKey ?? false)<input type="hidden" name="next_template" value="{{ $templateKey }}">@endif
    <div class="field"><label for="name">Name</label><input id="name" name="name" value="{{ old('name') }}" autocomplete="name" required maxlength="255"></div>
    <div class="field"><label for="email">Email</label><input id="email" type="email" name="email" value="{{ old('email') }}" autocomplete="email" required></div>
    <div class="field"><label for="password">Password</label><input id="password" type="password" name="password" autocomplete="new-password" minlength="8" required></div>
    <div class="field"><label for="password_confirmation">Confirm password</label><input id="password_confirmation" type="password" name="password_confirmation" autocomplete="new-password" minlength="8" required></div>
    <button class="button" type="submit">Create account</button>
</form>
<p class="switch">Already registered? <a href="{{ route('login', ($templateKey ?? false) ? ['template' => $templateKey] : []) }}">Sign in</a></p>
@endsection
