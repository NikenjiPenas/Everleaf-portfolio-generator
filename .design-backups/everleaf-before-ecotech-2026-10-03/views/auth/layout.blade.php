<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title') · EverLeaf Portfolio Generator</title>
    <style>
        *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:radial-gradient(ellipse at 80% 5%,#eee8ff 0,transparent 36%),#f7f5fb;color:#211b3d;font:16px/1.55 Inter,Segoe UI,Arial,sans-serif;cursor:url('{{ asset('images/cursor-wood-arrow.svg') }}') 4 2,auto}.card{width:min(100% - 32px,440px);padding:34px;background:#fff;border:1px solid #e7e1ec;border-radius:20px;box-shadow:0 18px 55px #28204610}.brand{display:flex;align-items:center;gap:9px;margin:0 0 24px;font-size:13px;font-weight:800;letter-spacing:.03em;color:#442c9a}.brand-mark{display:grid;place-items:center;width:31px;height:31px;border-radius:11px;background:linear-gradient(135deg,#7454df,#4b31a8);color:#fff;font-size:16px}.card h1{margin:0 0 7px;font-size:30px;letter-spacing:-.045em}.muted{margin:0 0 24px;color:#756f84}.field{display:grid;gap:6px;margin:15px 0}.field label{font-weight:700;font-size:13px;color:#38334d}.field input{width:100%;padding:11px 12px;border:1px solid #ded9e6;border-radius:10px;font:inherit}.field input:focus{outline:0;border-color:#6242c8;box-shadow:0 0 0 3px #6242c81c}.button{width:100%;margin-top:8px;border:0;border-radius:11px;padding:12px;background:#6242c8;color:#fff;font:inherit;font-weight:750;cursor:pointer}.button:hover{background:#442c9a}.switch{margin:19px 0 0;text-align:center;color:#756f84}.switch a,.back{color:#6242c8;font-weight:700;text-decoration:none}.errors,.notice{padding:11px 13px;border-radius:10px;margin:0 0 16px}.errors{background:#fff6f5;color:#913e38}.notice{background:#f0faf3;color:#236743}.remember{display:flex;align-items:center;gap:8px;margin:14px 0;color:#756f84;font-size:14px}a,button,.button,[role=button],input[type=submit]{cursor:url('{{ asset('images/cursor-wood-hand.svg') }}') 9 3,pointer}input,textarea{cursor:text}button,.button{transition:transform .16s ease,filter .16s ease,box-shadow .16s ease}button:hover,.button:hover{transform:translateY(-2px);filter:brightness(1.08)}button:active,.button:active{transform:translateY(0) scale(.99)}a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #d4e4a6;outline-offset:3px}
    </style>
    @yield('styles')
    <link rel="stylesheet" href="{{ asset('css/everleaf-cursors.css') }}">
    <link rel="stylesheet" href="{{ asset('css/everleaf-theme-toggle.css') }}">
    <script src="{{ asset('js/everleaf-theme-toggle.js') }}" defer></script>
</head>
<body class="@yield('body-class')"><main class="card">
    @hasSection('brand')
        @yield('brand')
    @else
        <p class="brand"><span class="brand-mark" aria-hidden="true">E</span> EVERLEAF PORTFOLIO GENERATOR</p>
    @endif
    @if (session('success'))<div class="notice" role="status">{{ session('success') }}</div>@endif
    @if ($errors->any())<div class="errors" role="alert"><ul style="margin:0;padding-left:20px">@foreach($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul></div>@endif
    @yield('content')
</main></body>
</html>
