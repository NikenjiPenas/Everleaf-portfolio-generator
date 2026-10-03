@php
    $portfolio = $portfolio ?? null;
    $educationRows = old('education_entries', $portfolio?->educationEntries->map(fn ($item) => [
        'school' => $item->school,
        'degree' => $item->degree,
        'field_of_study' => $item->field_of_study,
        'start_date' => $item->start_date?->format('Y-m-d'),
        'end_date' => $item->end_date?->format('Y-m-d'),
        'currently_studying' => $item->currently_studying,
        'description' => $item->description,
    ])->all() ?? [[]]);
    $skillRows = old('skill_entries', $portfolio?->skillEntries->map(fn ($item) => [
        'name' => $item->name,
        'level' => $item->level,
    ])->all() ?? [[]]);
    $projectRows = old('projects', $portfolio?->projects->map(fn ($item) => [
        'id' => $item->id,
        'has_image' => (bool) $item->image_path,
        'title' => $item->title,
        'description' => $item->description,
        'technologies' => implode(', ', $item->technologies ?? []),
        'project_url' => $item->project_url,
        'github_url' => $item->github_url,
    ])->all() ?? [[]]);
    $experienceRows = old('work_experiences', $portfolio?->workExperiences->map(fn ($item) => [
        'position' => $item->position,
        'company' => $item->company,
        'start_date' => $item->start_date?->format('Y-m-d'),
        'end_date' => $item->end_date?->format('Y-m-d'),
        'currently_working' => $item->currently_working,
        'description' => $item->description,
    ])->all() ?? [[]]);
    $socialRows = old('social_links', $portfolio?->socialLinks->map(fn ($item) => [
        'platform' => $item->platform,
        'url' => $item->url,
    ])->all() ?? [[]]);
    $educationRows = $educationRows ?: [[]];
    $skillRows = $skillRows ?: [[]];
    $projectRows = $projectRows ?: [[]];
    $experienceRows = $experienceRows ?: [[]];
    $socialRows = $socialRows ?: [[]];
@endphp
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $portfolio ? 'Edit your portfolio' : 'Create your portfolio' }}</title>
    <style>
        button.add,button.remove{display:inline-flex;min-height:40px;align-items:center;justify-content:center;padding:8px 12px;font-size:13px;font-weight:750;transition:transform .15s,filter .15s,background .15s}
        button.add:hover,button.remove:hover{transform:translateY(-1px);filter:brightness(1.12)}
        :root { color-scheme:light; --ink:#211b3d; --muted:#756f84; --line:#e7e1ec; --purple:#6242c8; --purple-dark:#442c9a; --pale:#f7f5fb; --warm:#fffaf1; }
        * { box-sizing:border-box; }
        body { margin:0; background:radial-gradient(ellipse at 86% 0%,#eee8ff 0,transparent 33%),var(--pale); color:var(--ink); font:16px/1.55 Inter,Segoe UI,Arial,sans-serif; }
        header { position:sticky; top:0; z-index:5; background:#fffdfde8; border-bottom:1px solid var(--line); padding:15px max(22px,calc((100vw - 920px)/2)); display:flex; justify-content:space-between; align-items:center; backdrop-filter:blur(14px); }
        .brand { display:flex; align-items:center; gap:10px; font-weight:800; letter-spacing:-.035em; font-size:17px; }
        .brand-mark { display:grid; place-items:center; width:32px; height:32px; border-radius:11px; background:linear-gradient(135deg,#7454df,#4b31a8); color:white; }
        .step { color:var(--purple); background:#f0eaff; border-radius:999px; padding:7px 11px; font-size:12px; font-weight:750; letter-spacing:.04em; }
        .back { color:var(--muted); text-decoration:none; font-size:13px; font-weight:650; }
        .back:hover { color:var(--purple); }
        main { max-width:920px; margin:43px auto 80px; padding:0 20px; }
        .eyebrow { margin:0 0 10px; color:var(--purple); font-size:12px; font-weight:800; letter-spacing:.13em; text-transform:uppercase; }
        h1 { font-size:clamp(32px,5vw,43px); line-height:1.08; letter-spacing:-.055em; margin:0 0 9px; }
        .intro { color:var(--muted); margin:0 0 29px; max-width:660px; }
        .card { background:#fff; border:1px solid var(--line); border-radius:19px; padding:27px; margin:17px 0; box-shadow:0 10px 30px #28204609; }
        .card h2 { display:flex; align-items:center; gap:11px; font-size:20px; margin:0 0 19px; letter-spacing:-.035em; }
        .card h2:before { content:""; display:block; width:4px; height:22px; border-radius:5px; background:linear-gradient(#967bf0,var(--purple)); }
        .grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:17px; }
        label { display:block; font-size:13px; font-weight:700; margin-bottom:6px; color:#38334d; }
        input,textarea,select { width:100%; border:1px solid #ded9e6; border-radius:10px; padding:11px 12px; font:inherit; font-size:14px; color:var(--ink); background:#fff; transition:border-color .15s,box-shadow .15s; }
        input:hover,textarea:hover,select:hover { border-color:#c9bce8; }
        textarea { min-height:106px; resize:vertical; }
        input:focus,textarea:focus,select:focus { outline:0; border-color:var(--purple); box-shadow:0 0 0 3px #6242c81c; }
        .field { min-width:0; }
        .full { grid-column:1/-1; }
        .hint { color:var(--muted); font-size:12px; margin:6px 0 0; }
        .entry { border:1px solid #ece7f1; background:#fcfbfe; border-radius:14px; padding:18px; margin:12px 0; }
        .entry-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; font-size:14px; font-weight:750; }
        .remove { border:0; background:transparent; color:#a9463e; cursor:pointer; font:inherit; font-size:12px; font-weight:700; }
        .add { border:1px solid #d9cef3; border-radius:10px; padding:9px 13px; background:#fff; color:var(--purple); font:inherit; font-size:13px; font-weight:750; cursor:pointer; transition:background .15s; }
        .add:hover { background:#f6f2ff; }
        .choices { display:flex; gap:12px; flex-wrap:wrap; }
        .choice { display:flex; align-items:center; gap:9px; border:1px solid var(--line); border-radius:11px; padding:10px 14px; font-weight:650; cursor:pointer; transition:border-color .15s,background .15s,box-shadow .15s; }
        .choice:has(input:checked) { border-color:#9a83e2; background:#f5f1ff; box-shadow:0 0 0 2px #6242c812; }
        .choice input { width:auto; accent-color:var(--purple); }
        .notice { border:1px solid #ccebd7; background:#f0faf3; color:#236743; border-radius:12px; padding:13px 16px; margin:16px 0; }
        .errors { border:1px solid #f1d6d4; background:#fff6f5; color:#913e38; border-radius:12px; padding:13px 18px; margin:16px 0; }
        .errors ul { margin:6px 0 0; padding-left:20px; }
        .actions { display:flex; justify-content:space-between; align-items:center; gap:14px; margin-top:22px; }
        .submit { border:0; border-radius:11px; padding:13px 19px; background:var(--purple); color:white; font:inherit; font-size:14px; font-weight:750; cursor:pointer; box-shadow:0 5px 14px #6242c82b; transition:transform .15s,background .15s; }
        .submit:hover { background:var(--purple-dark); transform:translateY(-1px); }
        :root{color-scheme:dark;--ink:#f2efdc;--muted:#becab6;--line:#dce8c532;--purple:#b9d18b;--purple-dark:#d0e1a6;--pale:#0a170f;--warm:#13251a}
        body{min-height:100vh;background:linear-gradient(90deg,#07130eea,#0c1b13df 48%,#07130eed),url('{{ asset('images/forest-hero.svg') }}') center/cover fixed;color:var(--ink)}
        header{border-bottom:1px solid var(--line);background:#0b1912eF;box-shadow:0 7px 22px #0002}
        .brand{color:#f2efdc}.brand-mark{border:1px solid #d7e5b459;border-radius:50% 50% 50% 12px;background:linear-gradient(145deg,#a9c77b,#436743);color:#102016}
        .step{border:1px solid #d6e7b638;background:#293e28;color:#d9e7b4}.back{color:#cad4c4}.back:hover{color:#e5edcf}
        main{max-width:960px;margin-top:38px}.eyebrow{color:#c8dc9b}.intro{color:#c5d0bf}
        .card{position:relative;overflow:hidden;margin:15px 0;padding:25px;border:1px solid #dce8c53b;border-radius:16px;background:linear-gradient(145deg,#13271dde,#0b1b12ed);box-shadow:0 14px 38px #0004, inset 0 1px #ffffff08;backdrop-filter:blur(10px)}
        .card:after{position:absolute;right:-20px;bottom:-48px;width:120px;height:140px;background:url('{{ asset('images/login-foliage.svg') }}') center/contain no-repeat;content:"";opacity:.11;pointer-events:none;transform:rotate(-20deg)}
        .card h2{position:relative;z-index:1;color:#f0f0df;font-family:Georgia,"Times New Roman",serif;font-size:20px}.card h2:before{background:linear-gradient(#c5d99a,#728d58)}
        label{color:#e2e7d8}.field{position:relative;z-index:1}.field label{color:#e1e7d8}input,textarea,select{border:1px solid #dbe7c53d;border-radius:9px;background:#08170fe8;color:#f2f1e4;box-shadow:inset 0 1px 4px #0003}input:hover,textarea:hover,select:hover{border-color:#bbd28b8a}input::placeholder,textarea::placeholder{color:#aab8a3}input:focus,textarea:focus,select:focus{border-color:#b9d18b;box-shadow:0 0 0 3px #b9d18b26}input[type="date"]{color-scheme:dark}input[type="file"]{padding:7px 9px;color:#c4d0bc}input[type="file"]::file-selector-button{margin-right:10px;border:1px solid #dce9c451;border-radius:7px;padding:6px 9px;background:#29402b;color:#edf0dd;font:inherit;font-size:12px;cursor:pointer}input[type="file"]::file-selector-button:hover{background:#395538}select option{background:#102116;color:#f3f0df}textarea{min-height:108px}.hint{color:#aebca8}.entry{position:relative;z-index:1;margin:11px 0;padding:16px;border:1px solid #dbe7c52a;border-radius:12px;background:linear-gradient(125deg,#0d1d14d9,#162b1dd9)}.entry-head{color:#edf0de}.remove{border:1px solid #d8a59a4a;border-radius:7px;padding:5px 9px;background:#472e27;color:#f3c9bb}.remove:hover{background:#60372d}.add{position:relative;z-index:1;border:1px solid #c7dca074;border-radius:9px;background:#243a26;color:#e1edc2}.add:hover{background:#344e30}.choices{position:relative;z-index:1}.choice{border-color:#dce8c53a;background:#0b1912;color:#e8ebdc}.choice:has(input:checked){border-color:#c2d992;background:#283e2a;box-shadow:0 0 0 2px #bdd48b20}.choice input{accent-color:#a8c478}.notice{border-color:#9dbb745c;background:#203b26;color:#e0efc6}.errors{border-color:#da95865e;background:#40221d;color:#ffe0d6}.errors li{color:#f7e4d9}.actions{position:relative;z-index:1;margin-top:19px}.submit{border:1px solid #e0edbc4d;border-radius:10px;background:linear-gradient(125deg,#819f5c,#4e713e);color:#fffce8;box-shadow:0 7px 20px #0004}.submit:hover{background:linear-gradient(125deg,#93af6e,#62844c)}a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #c8dc99;outline-offset:2px}
        @media(max-width:680px){header{padding:11px 15px}main{margin-top:27px}.card{padding:18px}.entry{padding:13px}.step{font-size:10px}}
    </style>
    <link rel="stylesheet" href="{{ asset('css/everleaf-cursors.css') }}">
    <link rel="stylesheet" href="{{ asset('css/everleaf-theme-toggle.css') }}">
    <script src="{{ asset('js/everleaf-theme-toggle.js') }}" defer></script>
</head>
<body>
<header>
    <div class="brand"><span class="brand-mark" aria-hidden="true">E</span> EverLeaf Portfolio Generator</div>
    <div><a class="back" href="{{ route('portfolios.index') }}">← My portfolios</a> <span class="step">YOUR INFO · 1 OF 3</span></div>
</header>
<main>
    <p class="eyebrow">✦ Let’s make it yours</p>
    <h1>{{ $portfolio ? 'Edit your portfolio' : 'Build your portfolio' }}</h1>
    <p class="intro">Add your details below. You can include multiple schools, skills, projects, jobs, and links.</p>

    @if (session('success'))
        <div class="notice" role="status">{{ session('success') }}</div>
    @endif
    @if ($errors->any())
        <div class="errors" role="alert"><strong>Please review these fields:</strong><ul>@foreach ($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul></div>
    @endif

    <form method="POST" action="{{ $portfolio ? route('portfolios.update', $portfolio) : route('portfolios.store') }}" enctype="multipart/form-data">
        @csrf
        @if ($portfolio) @method('PUT') @endif
        <section class="card">
            <h2>Personal details</h2>
            <div class="grid">
                <div class="field"><label for="full_name">Full name *</label><input id="full_name" name="full_name" value="{{ old('full_name', $portfolio?->full_name) }}" required maxlength="255" autocomplete="name"></div>
                <div class="field"><label for="email">Email *</label><input id="email" name="email" type="email" value="{{ old('email', $portfolio?->email) }}" required maxlength="255" autocomplete="email"></div>
                <div class="field"><label for="contact_number">Contact number</label><input id="contact_number" name="contact_number" value="{{ old('contact_number', $portfolio?->contact_number) }}" maxlength="40" autocomplete="tel"></div>
                <div class="field"><label for="profile_photo">Profile picture</label><input id="profile_photo" name="profile_photo" type="file" accept="image/*"><p class="hint">Image files up to 2 MB.</p></div>
                @if ($portfolio?->profile_photo_path)<div class="field full"><p class="hint">A profile picture is already saved. Choose a new file to replace it.</p></div>@endif
                <div class="field full"><label for="address">Address</label><input id="address" name="address" value="{{ old('address', $portfolio?->address) }}" maxlength="2000" autocomplete="street-address"></div>
                <div class="field full"><label for="about_me">About me</label><textarea id="about_me" name="about_me" maxlength="10000">{{ old('about_me', $portfolio?->about_me) }}</textarea></div>
            </div>
        </section>

        <section class="card">
            <h2>Choose a starting style</h2>
            <div class="choices">
                @foreach (['minimal' => 'Simple', 'modern' => 'Modern', 'creative' => 'Creative'] as $key => $label)
                    <label class="choice"><input type="radio" name="template_key" value="{{ $key }}" @checked(old('template_key', $portfolio?->template_key ?? ($templateKey ?? 'modern')) === $key)> {{ $label }}</label>
                @endforeach
            </div>
            <p class="hint">You can preview and change the design later.</p>
        </section>

        <section class="card">
            <h2>Education</h2>
            <div data-list="education_entries" data-next-index="{{ count($educationRows) }}">
                @foreach ($educationRows as $index => $entry)
                    <div class="entry" data-entry>
                        <div class="entry-head"><span>Education item</span><button class="remove" type="button" data-remove>Remove</button></div>
                        <div class="grid">
                            <div class="field"><label>School</label><input name="education_entries[{{ $index }}][school]" value="{{ $entry['school'] ?? '' }}" maxlength="255"></div>
                            <div class="field"><label>Degree or course</label><input name="education_entries[{{ $index }}][degree]" value="{{ $entry['degree'] ?? '' }}" maxlength="255"></div>
                            <div class="field"><label>Field of study</label><input name="education_entries[{{ $index }}][field_of_study]" value="{{ $entry['field_of_study'] ?? '' }}" maxlength="255"></div>
                            <div class="field"><label>Currently studying?</label><select name="education_entries[{{ $index }}][currently_studying]"><option value="0" @selected(empty($entry['currently_studying']))>No</option><option value="1" @selected(! empty($entry['currently_studying']))>Yes</option></select></div>
                            <div class="field"><label>Start date</label><input name="education_entries[{{ $index }}][start_date]" type="date" value="{{ $entry['start_date'] ?? '' }}"></div>
                            <div class="field"><label>End date</label><input name="education_entries[{{ $index }}][end_date]" type="date" value="{{ $entry['end_date'] ?? '' }}"></div>
                            <div class="field full"><label>Description</label><textarea name="education_entries[{{ $index }}][description]" maxlength="3000">{{ $entry['description'] ?? '' }}</textarea></div>
                        </div>
                    </div>
                @endforeach
            </div>
            <button class="add" type="button" data-add="education_entries">+ Add education</button>
        </section>

        <section class="card">
            <h2>Skills</h2>
            <div data-list="skill_entries" data-next-index="{{ count($skillRows) }}">
                @foreach ($skillRows as $index => $entry)
                    <div class="entry" data-entry><div class="entry-head"><span>Skill</span><button class="remove" type="button" data-remove>Remove</button></div><div class="grid"><div class="field"><label>Skill name</label><input name="skill_entries[{{ $index }}][name]" value="{{ $entry['name'] ?? '' }}" maxlength="120"></div><div class="field"><label>Level</label><select name="skill_entries[{{ $index }}][level]"><option @selected(($entry['level'] ?? 'Intermediate') === 'Beginner')>Beginner</option><option @selected(($entry['level'] ?? 'Intermediate') === 'Intermediate')>Intermediate</option><option @selected(($entry['level'] ?? 'Intermediate') === 'Advanced')>Advanced</option><option @selected(($entry['level'] ?? 'Intermediate') === 'Expert')>Expert</option></select></div></div></div>
                @endforeach
            </div>
            <button class="add" type="button" data-add="skill_entries">+ Add skill</button>
        </section>

        <section class="card">
            <h2>Projects</h2>
            <div data-list="projects" data-next-index="{{ count($projectRows) }}">
                @foreach ($projectRows as $index => $entry)
                    <div class="entry" data-entry>
                        <div class="entry-head"><span>Project</span><button class="remove" type="button" data-remove>Remove</button></div>
                        @if (!empty($entry['id']))<input type="hidden" name="projects[{{ $index }}][id]" value="{{ $entry['id'] }}">@endif
                        <div class="grid">
                            <div class="field"><label>Project title</label><input name="projects[{{ $index }}][title]" value="{{ $entry['title'] ?? '' }}" maxlength="255"></div>
                            <div class="field"><label>Technologies</label><input name="projects[{{ $index }}][technologies]" value="{{ $entry['technologies'] ?? '' }}" placeholder="Example: PHP, Laravel, MySQL" maxlength="500"></div>
                            <div class="field"><label>Project link</label><input name="projects[{{ $index }}][project_url]" type="url" value="{{ $entry['project_url'] ?? '' }}" placeholder="https://"></div>
                            <div class="field"><label>GitHub link</label><input name="projects[{{ $index }}][github_url]" type="url" value="{{ $entry['github_url'] ?? '' }}" placeholder="https://github.com/"></div>
                            <div class="field full"><label>Description</label><textarea name="projects[{{ $index }}][description]" maxlength="3000">{{ $entry['description'] ?? '' }}</textarea></div>
                            <div class="field full"><label>Project image</label><input name="projects[{{ $index }}][image]" type="file" accept="image/*"><p class="hint">Image files up to 4 MB. @if (!empty($entry['has_image'])) Leave blank to keep the current image.@endif</p></div>
                        </div>
                    </div>
                @endforeach
            </div>
            <button class="add" type="button" data-add="projects">+ Add project</button>
        </section>

        <section class="card">
            <h2>Work experience</h2>
            <div data-list="work_experiences" data-next-index="{{ count($experienceRows) }}">
                @foreach ($experienceRows as $index => $entry)
                    <div class="entry" data-entry>
                        <div class="entry-head"><span>Experience</span><button class="remove" type="button" data-remove>Remove</button></div>
                        <div class="grid">
                            <div class="field"><label>Position</label><input name="work_experiences[{{ $index }}][position]" value="{{ $entry['position'] ?? '' }}" maxlength="255"></div>
                            <div class="field"><label>Company</label><input name="work_experiences[{{ $index }}][company]" value="{{ $entry['company'] ?? '' }}" maxlength="255"></div>
                            <div class="field"><label>Start date</label><input name="work_experiences[{{ $index }}][start_date]" type="date" value="{{ $entry['start_date'] ?? '' }}"></div>
                            <div class="field"><label>End date</label><input name="work_experiences[{{ $index }}][end_date]" type="date" value="{{ $entry['end_date'] ?? '' }}"></div>
                            <div class="field"><label>Currently working here?</label><select name="work_experiences[{{ $index }}][currently_working]"><option value="0" @selected(empty($entry['currently_working']))>No</option><option value="1" @selected(! empty($entry['currently_working']))>Yes</option></select></div>
                            <div class="field full"><label>Description</label><textarea name="work_experiences[{{ $index }}][description]" maxlength="3000">{{ $entry['description'] ?? '' }}</textarea></div>
                        </div>
                    </div>
                @endforeach
            </div>
            <button class="add" type="button" data-add="work_experiences">+ Add experience</button>
        </section>

        <section class="card">
            <h2>Social and website links</h2>
            <div data-list="social_links" data-next-index="{{ count($socialRows) }}">
                @foreach ($socialRows as $index => $entry)
                    <div class="entry" data-entry><div class="entry-head"><span>Link</span><button class="remove" type="button" data-remove>Remove</button></div><div class="grid"><div class="field"><label>Platform</label><input name="social_links[{{ $index }}][platform]" value="{{ $entry['platform'] ?? '' }}" placeholder="GitHub, LinkedIn, website" maxlength="60"></div><div class="field"><label>URL</label><input name="social_links[{{ $index }}][url]" type="url" value="{{ $entry['url'] ?? '' }}" placeholder="https://"></div></div></div>
                @endforeach
            </div>
            <button class="add" type="button" data-add="social_links">+ Add link</button>
        </section>

        <div class="actions"><a class="back" href="{{ route('portfolios.index') }}">Save later and return</a><button class="submit" type="submit">{{ $portfolio ? 'Save changes' : 'Save portfolio and continue' }} <span aria-hidden="true">→</span></button></div>
    </form>
</main>
<script>
    document.querySelectorAll('[data-add]').forEach((button) => {
        button.addEventListener('click', () => {
            const listName = button.dataset.add;
            const list = document.querySelector(`[data-list="${listName}"]`);
            const template = list.querySelector('[data-entry]');
            const copy = template.cloneNode(true);
            const index = Number(list.dataset.nextIndex || 0);
            list.dataset.nextIndex = String(index + 1);
            copy.querySelectorAll('[name]').forEach((input) => {
                input.name = input.name.replace(new RegExp(`${listName}\\[\\d+\\]`), `${listName}[${index}]`);
                if (input.type === 'radio' || input.type === 'checkbox') input.checked = false;
                else if (input.tagName === 'SELECT') input.selectedIndex = 0;
                else input.value = '';
            });
            list.appendChild(copy);
        });
    });
    document.addEventListener('click', (event) => {
        if (!event.target.matches('[data-remove]')) return;
        const list = event.target.closest('[data-list]');
        if (list.querySelectorAll('[data-entry]').length === 1) {
            list.querySelector('[data-entry]').querySelectorAll('input, textarea').forEach((input) => {
                if (input.type === 'checkbox' || input.type === 'radio') input.checked = false;
                else input.value = '';
            });
            list.querySelector('[data-entry]').querySelectorAll('select').forEach((input) => input.selectedIndex = 0);
            return;
        }
        event.target.closest('[data-entry]').remove();
    });
</script>
</body>
</html>
