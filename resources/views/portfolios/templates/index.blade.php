<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#102016">
    <title>Choose a design · EverLeaf Portfolio Generator</title>
    <style>
        :root{color-scheme:dark;--forest:#102016;--deep:#09140e;--leaf:#c2d794;--cream:#f5f1df;--muted:#c1cbb9;--line:#dce8cb36}*{box-sizing:border-box}html{scroll-behavior:smooth}body{min-height:100vh;margin:0;background:linear-gradient(90deg,#08140eea,#0a170fdc 45%,#08140eea),url('{{ asset('images/forest-hero.svg') }}') center/cover fixed;color:var(--cream);font:14px/1.55 Inter,"Segoe UI",Arial,sans-serif}a{color:inherit}
        header{position:sticky;top:0;z-index:8;display:flex;align-items:center;justify-content:space-between;gap:15px;padding:12px max(20px,calc((100vw - 1190px)/2));border-bottom:1px solid var(--line);background:#0b1912eF;backdrop-filter:blur(13px)}header a{color:#d1e1a7;text-decoration:none;font-size:12px;font-weight:700}.brand{color:#f1efdd;font:600 14px Georgia,"Times New Roman",serif}main{max-width:1190px;margin:43px auto 66px;padding:0 22px}.eyebrow{margin:0 0 8px;color:#c5db94;font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}h1{margin:0 0 7px;color:#f4f1df;font:600 clamp(32px,5vw,45px)/1.1 Georgia,"Times New Roman",serif;letter-spacing:-.035em}.intro{margin:0 0 24px;color:#c5d0bf;font-size:12px}.notice{margin-bottom:15px;padding:10px 13px;border:1px solid #c3d99560;border-radius:9px;background:#203922;color:#edf2d7;font-size:12px}
        .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:17px}.card{overflow:hidden;border:1px solid #dce8cb52;border-radius:15px;background:linear-gradient(145deg,#13261beF,#0d1b13f5);box-shadow:0 18px 42px #0005;transition:transform .18s,border-color .18s}.card:hover{transform:translateY(-3px);border-color:#c9dc9a9c}.preview{position:relative;display:grid;height:225px;place-items:center;overflow:hidden;border-bottom:1px solid var(--line);background:linear-gradient(130deg,#172a1b,#0e1a12)}.preview:before{position:absolute;inset:0;background:linear-gradient(90deg,#0a160e95,#12221445),url('{{ asset('images/forest-hero.svg') }}') center 58%/cover;content:""}.template-number{position:absolute;z-index:3;top:11px;right:12px;display:grid;width:26px;height:26px;place-items:center;border:1px solid #e0e9c779;border-radius:50%;background:#253b27;color:#edf1de;font-size:10px;font-weight:800}.window{position:relative;z-index:1;width:86%;height:174px;overflow:hidden;border:1px solid #d9e5ca8f;border-radius:8px;background:#f1efe2;box-shadow:0 12px 30px #0009;transform:rotate(-.6deg)}.mini-top{display:flex;align-items:center;gap:7px}.mini-avatar{width:24px;height:24px;flex:none;border:1px solid #80936c;border-radius:50%;background:linear-gradient(145deg,#e0e2c6,#718361)}.mini-lines{flex:1}.mini-lines i{display:block;width:62%;height:4px;margin:3px 0;border-radius:4px;background:#50634a}.mini-lines i:last-child{width:39%;height:3px;background:#aab49f}.mini-title{margin:7px 0 3px;color:#455440;font:700 7px Georgia,serif}.mini-text{height:4px;margin:3px 0;border-radius:4px;background:#d9ddcf}.mini-text.short{width:66%}.mini-tags{display:flex;gap:3px;margin-top:5px}.mini-tags i{width:24px;height:7px;border-radius:7px;background:#dce2d2}.mini-photos{display:flex;gap:4px;margin-top:5px}.mini-photos i{flex:1;height:30px;border-radius:4px;background:linear-gradient(145deg,#84966b,#304c34)}.mini-photos i:nth-child(2){background:linear-gradient(145deg,#b9bd9c,#506a46)}.mini-photos i:nth-child(3){background:linear-gradient(145deg,#526e50,#c4c6a3)}
        .simple-window{padding:11px 13px;background:#f6f4e9;border-color:#d9d9c9;border-radius:3px;font-family:Georgia,serif;transform:rotate(-1deg)}.simple-window .mini-top{padding-bottom:6px;border-bottom:1px solid #daddd1}.simple-window .mini-avatar{filter:grayscale(.6)}.simple-columns{display:grid;grid-template-columns:1.2fr .8fr;gap:11px;margin-top:8px}.simple-window .mini-title{margin-top:4px}.simple-window .mini-photos i{height:26px}.modern-window{display:grid;grid-template-columns:24% 76%;background:#0e2017;border-color:#c2d49b;transform:rotate(-.4deg)}.modern-side{display:flex;flex-direction:column;gap:5px;padding:9px 6px;background:#13291d}.modern-side strong{margin-bottom:3px;color:#f1f0df;font:600 7px Georgia,serif}.modern-side span{padding:3px;color:#d4dfcb;font-size:5px}.modern-side span:first-of-type{border-radius:3px;background:#3c5635}.modern-main{padding:7px;background:#0d2017}.modern-banner{height:42px;padding:7px;border-radius:4px;background:linear-gradient(90deg,#07150dcc,#10291a55),url('{{ asset('images/forest-hero.svg') }}') center 54%/cover;color:#f2efdf}.modern-banner strong{display:block;font:600 9px Georgia,serif}.modern-banner span{font-size:5px;color:#d5dec9}.modern-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin:4px 0}.modern-stats i{padding:4px 2px;border:1px solid #dce8c51e;border-radius:3px;background:#152b1d;color:#dfe9cf;font-size:5px;text-align:center}.modern-blocks{display:grid;grid-template-columns:1fr 1fr;gap:4px}.modern-blocks i{height:35px;padding:4px;border:1px solid #dce8c522;border-radius:4px;background:#14291d}.modern-blocks i:after{display:block;width:76%;height:4px;margin-top:5px;background:#80946c;content:""}.creative-window{padding:9px 11px;background:radial-gradient(ellipse at 100% 0,#cbd0ac 0,transparent 30%),#f0ead7;border-color:#d3c8aa;transform:rotate(.7deg)}.creative-nav{display:flex;justify-content:flex-end;gap:8px;padding-bottom:4px;border-bottom:1px solid #d2c8ad;color:#55604d;font-size:5px}.creative-intro{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px}.creative-person{display:flex;align-items:center;gap:5px}.creative-person .mini-avatar{width:27px;height:27px}.creative-about{padding-left:6px;border-left:1px solid #d1c7aa}.creative-window .mini-title{margin-top:2px;color:#4a5d43}.creative-window .mini-text{height:3px;background:#d2cdbb}.creative-lower{display:grid;grid-template-columns:.8fr 1.2fr;gap:6px;margin-top:7px}.creative-paper{min-height:37px;padding:5px;border:1px solid #d2c7a7;border-radius:6px;background:#f6f0e1}.creative-window .mini-tags{flex-wrap:wrap;margin-top:3px}.creative-window .mini-tags i{width:20px;height:6px;background:#dfe3d0}.creative-window .mini-photos{margin-top:6px}.creative-window .mini-photos i{height:27px}
        .copy{padding:15px 16px 16px}.card-head{display:flex;align-items:center;justify-content:space-between;gap:8px}.card h2{margin:0;color:#f2efdd;font:600 19px Georgia,"Times New Roman",serif}.badge{padding:3px 8px;border:1px solid #b9d4814c;border-radius:999px;background:#2d4328;color:#d8e9ae;font-size:8px;font-weight:800;letter-spacing:.06em}.card p{min-height:40px;margin:6px 0 13px;color:#c4cfbd;font-size:11px}.buttons{display:flex;gap:7px}.buttons a,.buttons button{flex:1;display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:7px 8px;border:1px solid #dce8cb5d;border-radius:8px;background:#13251a;color:#e4eccf;font:inherit;font-size:10px;font-weight:750;text-decoration:none;cursor:pointer}.buttons a:hover{background:#243c28}.buttons form{display:flex;flex:1;margin:0}.buttons button.primary{width:100%;border-color:#6f8d53;background:linear-gradient(120deg,#758f50,#48683a);color:#fffbe9}.buttons button.primary:hover{filter:brightness(1.12)}.buttons button.selected{border-color:#b4d191;background:#2b452c;color:#e5efce}
        @media(max-width:850px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.card:last-child{grid-column:1/-1}.card:last-child .preview{height:215px}}
        @media(max-width:580px){header{padding:10px 14px}header .brand{font-size:11px}main{margin:30px auto 48px;padding:0 14px}.grid{grid-template-columns:1fr;gap:12px}.card:last-child{grid-column:auto}.preview,.card:last-child .preview{height:210px}.window{width:84%;height:160px}.copy{padding:14px}.card p{min-height:0}.buttons a,.buttons button{min-height:39px}.toolbar{padding-inline:12px}}
        body{background:linear-gradient(90deg,rgba(5,16,10,.78),rgba(7,20,12,.56) 48%,rgba(5,16,10,.76)),url('https://images.unsplash.com/photo-1774793846873-d922ef2733b1?auto=format&fit=crop&w=2200&q=80') center 58%/cover fixed,url('{{ asset('images/forest-hero.svg') }}') center/cover fixed,#08140d}
        header{padding-block:13px}
        header>a:first-child{display:inline-flex;min-height:42px;align-items:center;gap:8px;padding:9px 15px;border:1px solid #d6e6b270;border-radius:11px;background:linear-gradient(145deg,#263f2bdb,#12271bea);box-shadow:0 6px 18px #0005;color:#edf2dc;transition:transform .16s,background .16s,border-color .16s,box-shadow .16s}
        header>a:first-child:hover{transform:translateY(-2px);border-color:#d6e6b2c7;background:linear-gradient(145deg,#38583b,#1a3421);box-shadow:0 9px 22px #0007}
        .grid{gap:19px}.card{border-color:#dce8cb66;background:linear-gradient(145deg,rgba(17,37,25,.92),rgba(8,23,15,.93));box-shadow:0 22px 50px #0008, inset 0 1px #ffffff10;backdrop-filter:blur(12px)}
        .preview{height:250px;background:#0a190f}
        .preview:before{background:linear-gradient(90deg,#07130ca8,#10221855),url('https://images.unsplash.com/photo-1774793846873-d922ef2733b1?auto=format&fit=crop&w=1000&q=76') center 58%/cover,url('{{ asset('images/forest-hero.svg') }}') center/cover}
        .window{width:88%;height:196px;transform:none;border-radius:11px;box-shadow:0 16px 36px #000a}
        .design-frame{position:absolute;z-index:2;inset:0 auto auto 0;width:1200px;height:740px;border:0;opacity:0;transform:scale(var(--preview-scale,.28));transform-origin:top left;pointer-events:none;transition:opacity .2s}
        .design-frame.is-ready{opacity:1}
        .template-number{z-index:4;top:13px;right:14px;width:30px;height:30px;border-color:#e0e9c7a8;background:#15281bcf;box-shadow:0 3px 11px #0007}
        .copy{min-height:165px;padding:19px 18px 18px}.card h2{font-size:21px}.card p{min-height:42px;font-size:12px;line-height:1.6}
        .buttons{gap:9px}.buttons a,.buttons button{min-height:45px;border-radius:10px;font-size:12px;transition:transform .15s,filter .15s,background .15s,box-shadow .15s}
        .buttons a{background:rgba(12,30,19,.78)}.buttons a:hover,.buttons button:hover{transform:translateY(-2px);filter:brightness(1.14);box-shadow:0 7px 18px #0005}
        .buttons button.primary{background:linear-gradient(125deg,#8eaa65,#557842);box-shadow:0 5px 14px #0004}.buttons button.selected{border-color:#d0e5a5;background:#30492d}
        a:focus-visible,button:focus-visible{outline:3px solid #e0eeae;outline-offset:3px}
        @media(max-width:850px){.preview{height:245px}}
        @media(max-width:580px){header{padding:10px 14px}header>a:first-child{min-height:40px;padding:8px 12px}.preview,.card:last-child .preview{height:230px}.copy{min-height:0;padding:14px}.card p{min-height:0}.buttons a,.buttons button{min-height:43px}}
        @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.card,.buttons a,.buttons button,header>a:first-child{transition:none}}
        .buttons a,.buttons button{min-height:42px;font-size:12px;transition:transform .15s,filter .15s,background .15s}
        .buttons a:hover,.buttons button:hover{transform:translateY(-1px);filter:brightness(1.12)}
        a:focus-visible,button:focus-visible{outline:3px solid #e0eeae;outline-offset:3px}
    </style>
    <link rel="stylesheet" href="{{ asset('css/everleaf-cursors.css') }}">
    <link rel="stylesheet" href="{{ asset('css/everleaf-theme-toggle.css') }}">
    <script src="{{ asset('js/everleaf-theme-toggle.js') }}" defer></script>
</head>
<body>
<header><a href="{{ route('portfolios.index') }}">← My portfolios</a><div class="brand">Choose a design for {{ $portfolio->full_name }}</div></header>
<main>
    <p class="eyebrow">Step 2 · Pick your look</p><h1>Three ways to tell your story</h1><p class="intro">Each design uses your saved information. Preview a style, then select it for your portfolio.</p>
    @if (session('success'))<p class="notice" role="status">{{ session('success') }}</p>@endif
    <div class="grid">
        @foreach ([
            'minimal' => ['Simple', 'A calm editorial layout with generous spacing and clear sections.'],
            'modern' => ['Modern', 'A deep forest-green dashboard with a landscape hero and project cards.'],
            'creative' => ['Creative', 'A warm paper-inspired design with organic details and a collage layout.'],
        ] as $key => [$label, $description])
            <article class="card">
                <div class="preview"><span class="template-number">{{ $loop->iteration < 10 ? '0'.$loop->iteration : $loop->iteration }}</span>
                    @if($key === 'minimal')
                        <div class="window simple-window"><div class="mini-top"><i class="mini-avatar"></i><span class="mini-lines"><i></i><i></i></span></div><div class="simple-columns"><div><b class="mini-title">About Me</b><i class="mini-text"></i><i class="mini-text short"></i><b class="mini-title">Projects</b><div class="mini-photos"><i></i><i></i></div></div><div><b class="mini-title">Education</b><i class="mini-text"></i><i class="mini-text short"></i><b class="mini-title">Skills</b><div class="mini-tags"><i></i><i></i><i></i><i></i></div><b class="mini-title">Contact</b></div></div></div>
                    @elseif($key === 'modern')
                        <div class="window modern-window"><aside class="modern-side"><strong>{{ $portfolio->full_name }}</strong><span>Home</span><span>About</span><span>Skills</span><span>Projects</span><span>Experience</span></aside><div class="modern-main"><div class="modern-banner"><strong>Hello, I’m {{ $portfolio->full_name }}</strong><span>Portfolio · Modern style</span></div><div class="modern-stats"><i>{{ $portfolio->projects->count() }}+ Projects</i><i>{{ $portfolio->skillEntries->count() }}+ Skills</i><i>My Work</i></div><div class="modern-blocks"><i></i><i></i><i></i><i></i></div></div></div>
                    @else
                        <div class="window creative-window"><div class="creative-nav"><span>Home</span><span>About</span><span>Projects</span><span>Contact</span></div><div class="creative-intro"><div class="creative-person"><i class="mini-avatar"></i><span class="mini-lines"><i></i><i></i></span></div><div class="creative-about"><b class="mini-title">About Me</b><i class="mini-text"></i><i class="mini-text short"></i></div></div><div class="creative-lower"><div class="creative-paper"><b class="mini-title">My Skills</b><div class="mini-tags"><i></i><i></i><i></i></div></div><div class="creative-paper"><b class="mini-title">Education</b><i class="mini-text"></i><i class="mini-text short"></i></div></div><div class="creative-paper" style="margin-top:6px"><b class="mini-title">My Projects</b><div class="mini-photos"><i></i><i></i><i></i></div></div></div>
                    @endif
                    <iframe class="design-frame" title="{{ $label }} template preview for {{ $portfolio->full_name }}" src="{{ route('portfolios.preview', ['portfolio' => $portfolio, 'template' => $key, 'embed' => 1]) }}" loading="eager" sandbox="allow-same-origin" data-design-frame></iframe>
                </div>
                <div class="copy"><div class="card-head"><h2>{{ $label }}</h2>@if($portfolio->template_key === $key)<span class="badge">SELECTED</span>@endif</div><p>{{ $description }}</p>
                    <div class="buttons"><a href="{{ route('portfolios.preview', ['portfolio' => $portfolio, 'template' => $key]) }}">Preview</a><form method="POST" action="{{ route('portfolios.template.update', $portfolio) }}">@csrf<input type="hidden" name="template_key" value="{{ $key }}"><button class="primary {{ $portfolio->template_key === $key ? 'selected' : '' }}" type="submit">{{ $portfolio->template_key === $key ? 'Selected' : 'Use design' }}</button></form></div>
                </div>
            </article>
        @endforeach
    </div>
</main>
<script>
    const designFrames = document.querySelectorAll('[data-design-frame]');
    const fitDesignFrames = () => designFrames.forEach((frame) => {
        const viewport = frame.parentElement;
        const scale = Math.min(viewport.clientWidth / 1200, viewport.clientHeight / 740);
        frame.style.setProperty('--preview-scale', String(scale));
    });
    designFrames.forEach((frame) => frame.addEventListener('load', () => {
        try {
            if (frame.contentDocument?.body.classList.contains('embedded-preview')) frame.classList.add('is-ready');
        } catch (_) {
            // Keep the illustrated preview visible if this browser blocks embedded page access.
        }
    }));
    fitDesignFrames();
    new ResizeObserver(fitDesignFrames).observe(document.querySelector('.grid'));
</script>
</body>
</html>
