<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#102016">
    <title>Welcome to EverLeaf</title>
    <link rel="stylesheet" href="{{ asset('css/everleaf-cursors.css') }}">
    <link rel="stylesheet" href="{{ asset('css/everleaf-theme-toggle.css') }}">
    <script src="{{ asset('js/everleaf-theme-toggle.js') }}" defer></script>
    <style>
        :root {
            color-scheme: dark;
            --welcome-cream: #f4eacb;
            --welcome-leaf: #bfd28e;
        }
        * { box-sizing: border-box; }
        html, body { min-width: 320px; min-height: 100%; margin: 0; }
        body {
            min-height: 100vh;
            display: grid;
            place-items: center;
            overflow-x: hidden;
            padding: 82px 24px 34px;
            color: var(--welcome-cream);
            background: #102016 url('https://images.unsplash.com/photo-1770932136939-7e7f322cd8f6?auto=format&fit=crop&w=2200&q=85') center 52% / cover fixed no-repeat;
            font-family: Inter, "Segoe UI", Arial, sans-serif;
        }
        body::before {
            position: fixed;
            z-index: 0;
            inset: 0;
            content: "";
            background: linear-gradient(180deg, rgba(8, 18, 11, .28), rgba(5, 13, 8, .48)),
                        radial-gradient(ellipse at 50% 48%, rgba(24, 37, 18, .05), rgba(4, 13, 8, .38));
            transition: background .35s ease, filter .35s ease;
        }
        body > header {
            position: absolute !important;
            z-index: 20 !important;
            top: 18px;
            right: 24px;
            left: 24px;
            display: flex;
            justify-content: flex-end;
        }
        .welcome-brand {
            position: absolute;
            z-index: 21;
            top: 18px;
            left: 24px;
            display: inline-flex;
            align-items: center;
            gap: 9px;
            color: #f5f4e3;
            text-decoration: none;
            text-shadow: 0 2px 12px rgba(0, 0, 0, .75);
        }
        .brand-mark {
            display: grid;
            width: 38px;
            height: 38px;
            place-items: center;
            border: 1px solid rgba(226, 244, 183, .82);
            border-radius: 50% 50% 50% 14px;
            background: linear-gradient(145deg, #b5d485, #4f7748);
            box-shadow: 0 0 20px rgba(190, 229, 136, .34), inset 0 1px rgba(255, 255, 240, .55);
        }
        .brand-name { font: 700 20px Georgia, "Times New Roman", serif; letter-spacing: -.025em; }
        .welcome-scene {
            position: relative;
            z-index: 1;
            width: min(920px, 100%);
            padding: clamp(28px, 5.5vw, 68px) clamp(22px, 6vw, 82px) 47px;
            border-radius: 30px;
            isolation: isolate;
            text-align: center;
        }
        .welcome-scene::before {
            position: absolute;
            z-index: -1;
            inset: 0;
            content: "";
            border: 1px solid rgba(214, 243, 176, .76);
            border-radius: inherit;
            background:
                radial-gradient(ellipse at 50% -5%, rgba(194, 235, 150, .2), transparent 48%),
                linear-gradient(135deg, rgba(20, 58, 38, .78), rgba(7, 31, 23, .78) 52%, rgba(18, 55, 37, .8));
            box-shadow: 0 32px 90px rgba(0, 0, 0, .62), 0 0 18px rgba(174, 231, 131, .32), 0 0 52px rgba(133, 206, 103, .2), inset 0 1px rgba(249, 255, 226, .36), inset 0 0 42px rgba(171, 217, 132, .09);
            backdrop-filter: blur(22px) saturate(145%);
            -webkit-backdrop-filter: blur(22px) saturate(145%);
        }
        .welcome-scene::after {
            position: absolute;
            z-index: -1;
            inset: 13px;
            content: "";
            border: 1px solid rgba(220, 247, 185, .26);
            border-radius: 19px;
            box-shadow: inset 0 0 20px rgba(185, 231, 139, .07), 0 0 16px rgba(184, 230, 139, .1);
            pointer-events: none;
        }
        .welcome-kicker {
            margin: 0 0 13px;
            color: #d5dea9;
            font-size: 11px;
            font-weight: 750;
            letter-spacing: .19em;
            text-transform: uppercase;
        }
        h1 {
            max-width: 740px;
            margin: 0 auto;
            color: #f4e8c5;
            font: 600 clamp(35px, 6vw, 63px)/1.07 Georgia, "Times New Roman", serif;
            letter-spacing: -.035em;
            text-shadow: 0 4px 18px rgba(0, 0, 0, .58);
        }
        .welcome-copy {
            max-width: 660px;
            margin: 15px auto 0;
            color: #f0e2c3;
            font-size: clamp(14px, 2vw, 18px);
            line-height: 1.65;
            text-shadow: 0 2px 9px #160e08;
        }
        .forest-emblem {
            display: grid;
            width: clamp(104px, 16vw, 142px);
            height: clamp(84px, 13vw, 116px);
            place-items: center;
            margin: 18px auto 12px;
            border: 1px solid rgba(212, 239, 169, .48);
            border-radius: 48% 52% 46% 54%;
            background: radial-gradient(ellipse, rgba(194, 226, 135, .3), rgba(16, 49, 30, .25) 64%, transparent 70%);
            color: #d8e9ad;
            font-size: clamp(47px, 8vw, 70px);
            filter: drop-shadow(0 0 20px rgba(191, 228, 130, .5));
        }
        .journey-prompt { margin: 0 0 17px; color: #f0e2c3; font: 17px Georgia, serif; }
        .journey-button {
            display: inline-flex;
            min-width: min(320px, 100%);
            min-height: 62px;
            align-items: center;
            justify-content: center;
            gap: 13px;
            padding: 15px 26px;
            border: 1px solid rgba(220, 243, 177, .78);
            border-radius: 14px;
            background: linear-gradient(135deg, rgba(153, 190, 103, .76), rgba(57, 99, 57, .64) 52%, rgba(26, 63, 42, .72));
            color: #f4f6df;
            box-shadow: 0 12px 30px rgba(3, 15, 8, .42), 0 0 22px rgba(185, 224, 124, .2), inset 0 1px rgba(255, 255, 234, .43), inset 0 -1px rgba(13, 39, 23, .4);
            backdrop-filter: blur(14px) saturate(145%);
            -webkit-backdrop-filter: blur(14px) saturate(145%);
            font: 700 19px Georgia, serif;
            text-decoration: none;
            text-shadow: 0 1px 4px rgba(4, 22, 11, .78);
            transition: transform .18s ease, filter .18s ease, box-shadow .18s ease;
        }
        .journey-button:hover {
            transform: translateY(-3px);
            filter: brightness(1.18);
            border-color: #e4f5bd;
            background: linear-gradient(135deg, rgba(180, 218, 125, .88), rgba(77, 132, 72, .78) 52%, rgba(34, 87, 54, .84));
            box-shadow: 0 16px 38px rgba(2, 13, 7, .5), 0 0 32px rgba(195, 235, 132, .43), inset 0 1px rgba(255, 255, 239, .62), inset 0 -1px rgba(13, 39, 23, .36);
        }
        .journey-button:active { transform: translateY(1px) scale(.99); box-shadow: 0 6px 18px rgba(0, 0, 0, .42), inset 0 2px 8px rgba(9, 32, 17, .32); }
        .journey-button:focus-visible { outline: 3px solid #e7f4b9; outline-offset: 5px; }
        .journey-leaf { font-size: 23px; }
        html[data-everleaf-theme="light"] body::before {
            background: linear-gradient(180deg, rgba(40, 55, 25, .04), rgba(31, 43, 23, .2)),
                        radial-gradient(ellipse at 50% 46%, rgba(250, 222, 149, .14), rgba(114, 137, 68, .08));
        }
        html[data-everleaf-theme="light"] .welcome-scene::before {
            background: radial-gradient(ellipse at 50% -5%, rgba(221, 248, 175, .3), transparent 48%),
                        linear-gradient(135deg, rgba(35, 79, 49, .76), rgba(13, 48, 33, .78) 52%, rgba(31, 76, 47, .78));
            box-shadow: 0 30px 82px rgba(0, 0, 0, .45), 0 0 24px rgba(209, 244, 156, .48), 0 0 58px rgba(176, 224, 132, .3), inset 0 1px rgba(255, 255, 239, .55), inset 0 0 45px rgba(208, 239, 158, .12);
        }
        @media (max-width: 620px) {
            body { padding: 83px 15px 24px; background-attachment: scroll; }
            body > header { top: 15px; right: 14px; left: auto; }
            .welcome-brand { top: 15px; left: 14px; }
            .brand-name { font-size: 17px; }
            .welcome-scene { padding: 35px 20px 34px; }
            .welcome-scene::before { border-width: 9px; border-radius: 23px; }
            .welcome-scene::after { inset: 10px; }
            .welcome-kicker { font-size: 9px; letter-spacing: .13em; }
            .welcome-copy { font-size: 14px; }
            .journey-button { min-height: 57px; font-size: 17px; }
        }
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
        }
    </style>
</head>
<body>
    <a class="welcome-brand" href="{{ route('welcome') }}" aria-label="EverLeaf welcome screen">
        <span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 36 36" width="27" height="27" focusable="false"><path d="M7 27C8 16 15 8 29 5c-1.5 13-8.5 20.5-22 22Z" fill="#1d3622"/><path d="M9 26c6-7 11-11 18-17M8 29c7-5 14-6 21-4" fill="none" stroke="#edf3d3" stroke-linecap="round" stroke-width="2"/></svg></span>
        <span class="brand-name">EverLeaf</span>
    </a>
    <header aria-label="Appearance settings"></header>
    <main class="welcome-scene">
        <p class="welcome-kicker">A portfolio journey, rooted in nature</p>
        <h1>Welcome to EverLeaf</h1>
        <p class="welcome-copy">Build and share the portfolio that feels like you. Thoughtful, nature-inspired, and ready to grow.</p>
        <div class="forest-emblem" aria-hidden="true">🌱</div>
        <p class="journey-prompt">Ready to showcase your work?</p>
        <a class="journey-button" href="{{ route('home') }}">
            <span class="journey-leaf" aria-hidden="true">❧</span>
            <span>Start Your Journey</span>
            <span aria-hidden="true">→</span>
        </a>
    </main>
</body>
</html>
