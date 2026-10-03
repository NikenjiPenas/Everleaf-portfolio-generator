<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#102016">
    <title>Thank You for Visiting · EverLeaf</title>
    <link rel="stylesheet" href="{{ asset('css/everleaf-cursors.css') }}">
    <link rel="stylesheet" href="{{ asset('css/everleaf-theme-toggle.css') }}">
    <script src="{{ asset('js/everleaf-theme-toggle.js') }}" defer></script>
    <style>
        :root{color-scheme:dark;--farewell-cream:#f5e9c5;--farewell-leaf:#c7dc9a}
        *{box-sizing:border-box}
        html,body{min-width:320px;min-height:100%;margin:0}
        body{min-height:100vh;display:grid;place-items:center;overflow-x:hidden;padding:88px 20px 36px;color:var(--farewell-cream);background:#102016 url('https://images.unsplash.com/photo-1770932136939-7e7f322cd8f6?auto=format&fit=crop&w=2200&q=85') center 52%/cover fixed no-repeat;font-family:Inter,"Segoe UI",Arial,sans-serif}
        body::before{position:fixed;z-index:0;inset:0;content:"";background:linear-gradient(180deg,rgba(5,14,8,.3),rgba(4,13,8,.66)),radial-gradient(ellipse at 50% 40%,rgba(20,40,19,.02),rgba(3,12,7,.45));pointer-events:none}
        .farewell-brand{position:absolute;z-index:2;top:18px;left:24px;display:inline-flex;align-items:center;gap:10px;padding:6px 15px 6px 7px;border:1px solid #d8eab45c;border-radius:999px;background:rgba(5,17,10,.76);color:#fffbe9;text-decoration:none;text-shadow:0 2px 12px #000b;box-shadow:0 5px 22px #0007,0 0 16px #a9d47d30;backdrop-filter:blur(12px)}
        .brand-mark{display:grid;width:44px;height:44px;place-items:center;border:1px solid #e2f4b7e8;border-radius:50% 50% 50% 14px;background:linear-gradient(145deg,#c5e795,#527d49);color:#132316;font:800 25px Georgia,serif;box-shadow:0 0 22px #bee5888a,inset 0 1px #fffff0a8}
        .brand-name{font:700 22px Georgia,"Times New Roman",serif;letter-spacing:-.025em}
        .farewell-controls{position:absolute;z-index:20;top:18px;right:24px;left:auto;display:flex;justify-content:flex-end}
        .farewell-scene{position:relative;z-index:1;width:min(900px,100%);padding:clamp(36px,6vw,72px) clamp(22px,7vw,82px) 48px;border:12px solid transparent;border-radius:25px;isolation:isolate;text-align:center}
        .farewell-scene::before{position:absolute;z-index:-2;inset:0;content:"";border:1px solid #e1c4939c;border-radius:inherit;background:repeating-linear-gradient(2deg,transparent 0 18px,#2d160b42 19px,#edbf7b18 21px,transparent 25px),repeating-linear-gradient(90deg,#70401fdc 0,#9a6034e8 18%,#5a301bdc 37%,#ad7545e8 58%,#60351fe8 78%,#8b562fe8 100%);box-shadow:0 30px 80px #000b,0 0 28px #c4df8c43,inset 0 0 0 7px #4b2b1c,inset 0 0 0 10px #c69b64,inset 0 1px 24px #f0d69b57}
        .farewell-scene::after{position:absolute;z-index:-1;inset:13px;content:"";border:1px solid #f0d8a55c;border-radius:12px;box-shadow:inset 0 0 26px #f7df9d14,0 0 20px #e4c17d17;pointer-events:none}
        .farewell-kicker{margin:0 0 12px;color:#e4d29b;font-size:11px;font-weight:750;letter-spacing:.18em;text-transform:uppercase;text-shadow:0 2px 4px #130b06}
        h1{margin:0 auto;color:#f8e7b4;font:600 clamp(34px,6vw,62px)/1.1 Georgia,"Times New Roman",serif;letter-spacing:-.025em;text-shadow:0 3px 4px #211207,0 8px 18px #160c06b3}
        .farewell-copy{max-width:680px;margin:14px auto 0;color:#f5e3bd;font-size:clamp(16px,2.5vw,23px);line-height:1.5;text-shadow:0 2px 5px #1c1008}
        .forest-garden{display:flex;min-height:132px;align-items:center;justify-content:center;gap:12px;margin:16px auto 12px;color:#f2d88e;font-size:clamp(38px,8vw,66px);filter:drop-shadow(0 5px 8px #1a1008) drop-shadow(0 0 15px #d9e9917a)}
        .forest-garden span:nth-child(2){font-size:1.14em}.forest-garden span:nth-child(3){font-size:.82em}
        .farewell-closing{margin:0;color:#f5e5be;font:clamp(17px,2.4vw,23px)/1.55 Georgia,"Times New Roman",serif;text-shadow:0 2px 5px #1c1008}
        .farewell-leaf{display:block;margin:16px auto 19px;color:#e0d69b;font-size:40px;text-shadow:0 0 18px #e2e6a773}
        .farewell-actions{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px}
        .return-button{display:inline-flex;min-height:48px;align-items:center;justify-content:center;gap:9px;padding:11px 21px;border:1px solid #e1edb4c9;border-radius:999px;background:linear-gradient(140deg,#829e58,#41623a);color:#fff9e5;text-decoration:none;font-size:15px;font-weight:750;text-shadow:0 1px 3px #172110;box-shadow:0 8px 22px #090e087a,0 0 17px #b5d98740,inset 0 1px #ffffe66b;transition:transform .18s ease,filter .18s ease,box-shadow .18s ease}
        .return-button:hover{transform:translateY(-2px) scale(1.035);filter:brightness(1.12);box-shadow:0 12px 30px #090e088a,0 0 27px #b5e48280,inset 0 1px #ffffe68c}
        .login-again{padding:10px 15px;border:1px solid #f1e0b760;border-radius:999px;background:#20170d55;color:#f7e9c8;text-decoration:none;font-size:14px;font-weight:650;backdrop-filter:blur(8px);transition:background .18s ease,box-shadow .18s ease}
        .login-again:hover{background:#604023a3;box-shadow:0 0 18px #e5c98c54}
        html[data-everleaf-theme="light"] body::before{background:linear-gradient(180deg,rgba(36,45,20,.12),rgba(23,34,18,.4)),radial-gradient(ellipse at 50% 40%,rgba(245,222,154,.12),rgba(79,101,44,.12))}
        html[data-everleaf-theme="light"] .farewell-scene::before{box-shadow:0 30px 80px #0008,0 0 30px #d7eba06b,inset 0 0 0 7px #4b2b1c,inset 0 0 0 10px #c69b64,inset 0 1px 24px #f0d69b70}
        @media(max-width:600px){body{padding:78px 13px 24px;background-attachment:scroll}.farewell-brand{top:13px;left:12px;gap:7px;padding:5px 11px 5px 5px}.brand-mark{width:36px;height:36px;font-size:21px}.brand-name{font-size:18px}.farewell-controls{top:13px;right:12px}.farewell-scene{padding:40px 18px 33px;border-width:8px;border-radius:20px}.farewell-scene::after{inset:9px}.farewell-kicker{font-size:9px;letter-spacing:.13em}.farewell-copy{font-size:16px}.forest-garden{min-height:98px}.farewell-closing{font-size:17px}.return-button{width:100%;min-height:48px}.farewell-actions{gap:8px}.login-again{font-size:13px}}
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition-duration:.01ms!important}}
    </style>
</head>
<body>
    <a class="farewell-brand" href="{{ route('welcome') }}" aria-label="EverLeaf home"><span class="brand-mark" aria-hidden="true">E</span><span class="brand-name">EverLeaf</span></a>
    <header class="farewell-controls" aria-label="Appearance settings"></header>
    <main class="farewell-scene">
        <p class="farewell-kicker">Your portfolio journey can always continue</p>
        <h1>Thank You For Visiting!</h1>
        <p class="farewell-copy">We hope you enjoyed creating your portfolio with EverLeaf.</p>
        <div class="forest-garden" role="img" aria-label="A small glowing forest garden"><span aria-hidden="true">🌿</span><span aria-hidden="true">🍄</span><span aria-hidden="true">🌱</span></div>
        <p class="farewell-closing">We look forward to seeing you again.<br>Your journey is just beginning.</p>
        <span class="farewell-leaf" aria-hidden="true">❧</span>
        <div class="farewell-actions">
            <a class="return-button" href="{{ route('welcome') }}"><span aria-hidden="true">❧</span> Return to EverLeaf <span aria-hidden="true">→</span></a>
            <a class="login-again" href="{{ route('login') }}">Sign in again</a>
        </div>
    </main>
</body>
</html>
