<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Models\EducationEntry;
use App\Models\PortfolioProject;
use App\Models\SkillEntry;
use App\Models\SocialLink;
use App\Models\WorkExperience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;

class PortfolioController extends Controller
{
    public function index(): View
    {
        return view('portfolios.index', [
            'portfolios' => Portfolio::query()->where('user_id', auth()->id())->latest()->get(),
        ]);
    }

    public function create(Request $request): View
    {
        $requestedTemplate = $request->query('template');
        $templateKey = in_array($requestedTemplate, ['modern', 'minimal', 'creative'], true)
            ? $requestedTemplate
            : 'modern';

        return view('portfolios.create', ['portfolio' => null, 'templateKey' => $templateKey]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->savePortfolio($request);

        return redirect()->route('portfolios.index')->with('success', 'Portfolio saved.');
    }

    public function edit(Portfolio $portfolio): View
    {
        $this->ensureOwner($portfolio);
        $portfolio->load(['educationEntries', 'skillEntries', 'projects', 'workExperiences', 'socialLinks']);

        return view('portfolios.create', ['portfolio' => $portfolio, 'templateKey' => $portfolio->template_key]);
    }

    public function preview(Request $request, Portfolio $portfolio, string $template): View
    {
        $this->ensureOwner($portfolio);
        abort_unless(in_array($template, ['modern', 'minimal', 'creative'], true), 404);
        $portfolio->load(['educationEntries', 'skillEntries', 'projects', 'workExperiences', 'socialLinks']);
        $templateLabel = $template === 'minimal' ? 'Simple' : ucfirst($template);

        $embedded = $request->boolean('embed');

        return view('portfolios.templates.'.$template, compact('portfolio', 'template', 'templateLabel', 'embedded'));
    }

    public function demoPreview(Request $request, string $template): View
    {
        abort_unless(in_array($template, ['modern', 'minimal', 'creative'], true), 404);

        $portfolio = new Portfolio([
            'full_name' => 'Alex Morgan',
            'email' => 'alex@example.com',
            'contact_number' => '+1 555 010 2468',
            'address' => 'Portland, Oregon',
            'about_me' => 'I build thoughtful digital experiences and enjoy turning ideas into clear, useful websites. I care about accessible design, clean code, and learning through every project.',
            'template_key' => $template,
        ]);
        $makeEntry = static function (string $model, array $attributes): object {
            return (new $model())->forceFill($attributes);
        };

        $portfolio->setRelation('projects', collect([
            $makeEntry(PortfolioProject::class, ['title' => 'Forest Notes', 'description' => 'A calm journal for collecting places, ideas, and field notes.', 'technologies' => ['Laravel', 'MySQL'], 'project_url' => null, 'github_url' => null, 'image_path' => null]),
            $makeEntry(PortfolioProject::class, ['title' => 'Portfolio Studio', 'description' => 'A simple way to turn a profile into a polished online portfolio.', 'technologies' => ['PHP', 'Blade'], 'project_url' => null, 'github_url' => null, 'image_path' => null]),
        ]));
        $portfolio->setRelation('skillEntries', collect([
            $makeEntry(SkillEntry::class, ['name' => 'Laravel', 'level' => 'Advanced']),
            $makeEntry(SkillEntry::class, ['name' => 'PHP', 'level' => 'Intermediate']),
            $makeEntry(SkillEntry::class, ['name' => 'MySQL', 'level' => 'Intermediate']),
            $makeEntry(SkillEntry::class, ['name' => 'UI Design', 'level' => 'Advanced']),
        ]));
        $portfolio->setRelation('educationEntries', collect([
            $makeEntry(EducationEntry::class, ['school' => 'Northview College', 'degree' => 'B.S. Information Technology', 'field_of_study' => 'Web Development', 'start_date' => '2022-09-01', 'end_date' => null, 'currently_studying' => true, 'description' => 'Coursework in software development, databases, and user-centered design.']),
        ]));
        $portfolio->setRelation('workExperiences', collect([
            $makeEntry(WorkExperience::class, ['position' => 'Junior Web Developer', 'company' => 'Evergreen Studio', 'start_date' => '2024-06-01', 'end_date' => null, 'currently_working' => true, 'description' => 'Builds responsive pages and helps maintain client websites.']),
        ]));
        $portfolio->setRelation('socialLinks', collect([
            $makeEntry(SocialLink::class, ['platform' => 'Website', 'url' => '#contact']),
            $makeEntry(SocialLink::class, ['platform' => 'GitHub', 'url' => '#contact']),
        ]));

        $templateLabel = $template === 'minimal' ? 'Simple' : ucfirst($template);
        $embedded = $request->boolean('embed');
        $demo = true;

        return view('portfolios.templates.'.$template, compact('portfolio', 'template', 'templateLabel', 'embedded', 'demo'));
    }

    public function templates(Portfolio $portfolio): View
    {
        $this->ensureOwner($portfolio);
        $portfolio->load(['educationEntries', 'skillEntries', 'projects', 'workExperiences', 'socialLinks']);

        return view('portfolios.templates.index', compact('portfolio'));
    }

    public function publicPage(string $slug): View
    {
        $portfolio = Portfolio::query()->where('slug', $slug)->where('is_published', true)->firstOrFail();
        $portfolio->load(['educationEntries', 'skillEntries', 'projects', 'workExperiences', 'socialLinks']);
        $template = in_array($portfolio->template_key, ['modern', 'minimal', 'creative'], true)
            ? $portfolio->template_key
            : 'modern';
        $templateLabel = $template === 'minimal' ? 'Simple' : ucfirst($template);
        $public = true;

        return view('portfolios.templates.'.$template, compact('portfolio', 'template', 'templateLabel', 'public'));
    }

    public function togglePublished(Portfolio $portfolio): RedirectResponse
    {
        $this->ensureOwner($portfolio);
        $portfolio->update(['is_published' => ! $portfolio->is_published]);

        return redirect()->route('portfolios.index')->with(
            'success',
            $portfolio->is_published ? 'Portfolio published.' : 'Portfolio is now private.'
        );
    }

    public function selectTemplate(Request $request, Portfolio $portfolio): RedirectResponse
    {
        $this->ensureOwner($portfolio);
        $data = $request->validate([
            'template_key' => ['required', 'in:modern,minimal,creative'],
        ]);

        $portfolio->update(['template_key' => $data['template_key']]);

        return redirect()
            ->route('portfolios.preview', [$portfolio, $data['template_key']])
            ->with('success', 'Template selected.');
    }

    public function update(Request $request, Portfolio $portfolio): RedirectResponse
    {
        $this->ensureOwner($portfolio);
        $this->savePortfolio($request, $portfolio);

        return redirect()->route('portfolios.index')->with('success', 'Portfolio updated.');
    }

    public function destroy(Portfolio $portfolio): RedirectResponse
    {
        $this->ensureOwner($portfolio);
        $files = collect([$portfolio->profile_photo_path])
            ->merge($portfolio->projects()->pluck('image_path'))
            ->filter()
            ->unique();

        DB::transaction(fn () => $portfolio->delete());

        foreach ($files as $file) {
            Storage::disk('public')->delete($file);
        }

        return redirect()->route('portfolios.index')->with('success', 'Portfolio deleted.');
    }

    private function savePortfolio(Request $request, ?Portfolio $portfolio = null): Portfolio
    {
        $this->removeEmptyRows($request);
        $data = $this->validatePortfolio($request);
        $existingProjects = $portfolio?->projects()->get()->keyBy('id') ?? collect();
        $oldFiles = collect([$portfolio?->profile_photo_path])
            ->merge($existingProjects->pluck('image_path'))
            ->filter()
            ->unique();

        $saved = DB::transaction(function () use ($request, $data, $portfolio, $existingProjects): Portfolio {
            $profilePhotoPath = isset($data['profile_photo'])
                ? $data['profile_photo']->store('portfolios/profiles', 'public')
                : $portfolio?->profile_photo_path;

            $attributes = [
                'user_id' => $portfolio?->user_id ?? $request->user()?->id,
                'slug' => Portfolio::createSlug($data['full_name'], $portfolio?->id),
                'full_name' => $data['full_name'],
                'email' => $data['email'],
                'contact_number' => $data['contact_number'] ?? null,
                'address' => $data['address'] ?? null,
                'about_me' => $data['about_me'] ?? null,
                'profile_photo_path' => $profilePhotoPath,
                'template_key' => $data['template_key'],
            ];

            if ($portfolio) {
                $portfolio->update($attributes);
            } else {
                $portfolio = Portfolio::create($attributes);
            }

            $portfolio->educationEntries()->delete();
            foreach ($data['education_entries'] ?? [] as $index => $entry) {
                $portfolio->educationEntries()->create($entry + ['sort_order' => $index]);
            }

            $portfolio->skillEntries()->delete();
            foreach ($data['skill_entries'] ?? [] as $index => $entry) {
                $portfolio->skillEntries()->create($entry + ['sort_order' => $index]);
            }

            $portfolio->projects()->delete();
            foreach ($data['projects'] ?? [] as $index => $project) {
                $existingImage = isset($project['id'])
                    ? $existingProjects->get((int) $project['id'])?->image_path
                    : null;
                $imagePath = isset($project['image'])
                    ? $project['image']->store('portfolios/projects', 'public')
                    : $existingImage;
                $technologies = isset($project['technologies'])
                    ? array_values(array_filter(array_map('trim', explode(',', $project['technologies']))))
                    : [];

                $portfolio->projects()->create([
                    'title' => $project['title'],
                    'description' => $project['description'] ?? null,
                    'technologies' => $technologies,
                    'project_url' => $project['project_url'] ?? null,
                    'github_url' => $project['github_url'] ?? null,
                    'image_path' => $imagePath,
                    'sort_order' => $index,
                ]);
            }

            $portfolio->workExperiences()->delete();
            foreach ($data['work_experiences'] ?? [] as $index => $experience) {
                $portfolio->workExperiences()->create($experience + ['sort_order' => $index]);
            }

            $portfolio->socialLinks()->delete();
            foreach ($data['social_links'] ?? [] as $index => $link) {
                $portfolio->socialLinks()->create($link + ['sort_order' => $index]);
            }

            return $portfolio;
        });

        $currentFiles = collect([$saved->profile_photo_path])
            ->merge($saved->projects()->pluck('image_path'))
            ->filter()
            ->unique();

        foreach ($oldFiles->diff($currentFiles) as $file) {
            Storage::disk('public')->delete($file);
        }

        return $saved;
    }

    private function ensureOwner(Portfolio $portfolio): void
    {
        abort_unless($portfolio->user_id === auth()->id(), 403);
    }

    private function removeEmptyRows(Request $request): void
    {
        $rowKeys = [
            'education_entries' => 'school',
            'skill_entries' => 'name',
            'projects' => 'title',
            'work_experiences' => 'position',
            'social_links' => 'platform',
        ];

        foreach ($rowKeys as $group => $primaryField) {
            $rows = collect($request->input($group, []))
                ->filter(fn ($row) => is_array($row) && filled($row[$primaryField] ?? null))
                ->values()
                ->all();

            $request->merge([$group => $rows]);
        }
    }

    private function validatePortfolio(Request $request): array
    {
        $dateOrder = function ($attribute, $value, $fail) use ($request): void {
            if (! filled($value)) {
                return;
            }

            [$group, $index] = explode('.', $attribute);
            $startDate = $request->input($group.'.'.$index.'.start_date');
            $endTimestamp = strtotime((string) $value);
            $startTimestamp = filled($startDate) ? strtotime((string) $startDate) : false;

            if ($startTimestamp !== false && $endTimestamp !== false && $endTimestamp < $startTimestamp) {
                $fail('The end date must be on or after the start date.');
            }
        };

        return $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'contact_number' => ['nullable', 'string', 'max:40'],
            'address' => ['nullable', 'string', 'max:2000'],
            'about_me' => ['nullable', 'string', 'max:10000'],
            'profile_photo' => ['nullable', 'image', 'max:2048'],
            'template_key' => ['required', 'in:modern,minimal,creative'],
            'education_entries' => ['array'],
            'education_entries.*.school' => ['required', 'string', 'max:255'],
            'education_entries.*.degree' => ['required', 'string', 'max:255'],
            'education_entries.*.field_of_study' => ['nullable', 'string', 'max:255'],
            'education_entries.*.start_date' => ['nullable', 'date'],
            'education_entries.*.end_date' => ['nullable', 'date', $dateOrder],
            'education_entries.*.currently_studying' => ['nullable', 'boolean'],
            'education_entries.*.description' => ['nullable', 'string', 'max:3000'],
            'skill_entries' => ['array'],
            'skill_entries.*.name' => ['required', 'string', 'max:120'],
            'skill_entries.*.level' => ['required', 'in:Beginner,Intermediate,Advanced,Expert'],
            'projects' => ['array'],
            'projects.*.id' => ['nullable', 'integer'],
            'projects.*.title' => ['required', 'string', 'max:255'],
            'projects.*.description' => ['nullable', 'string', 'max:3000'],
            'projects.*.technologies' => ['nullable', 'string', 'max:500'],
            'projects.*.project_url' => ['nullable', 'url', 'max:2048'],
            'projects.*.github_url' => ['nullable', 'url', 'max:2048'],
            'projects.*.image' => ['nullable', 'image', 'max:4096'],
            'work_experiences' => ['array'],
            'work_experiences.*.position' => ['required', 'string', 'max:255'],
            'work_experiences.*.company' => ['required', 'string', 'max:255'],
            'work_experiences.*.start_date' => ['nullable', 'date'],
            'work_experiences.*.end_date' => ['nullable', 'date', $dateOrder],
            'work_experiences.*.currently_working' => ['nullable', 'boolean'],
            'work_experiences.*.description' => ['nullable', 'string', 'max:3000'],
            'social_links' => ['array'],
            'social_links.*.platform' => ['required', 'string', 'max:60'],
            'social_links.*.url' => ['required', 'url', 'max:2048'],
        ]);
    }
}
