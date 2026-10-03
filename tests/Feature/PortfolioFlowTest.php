<?php

namespace Tests\Feature;

use App\Models\Portfolio;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PortfolioFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_and_login_work(): void
    {
        $response = $this->post('/register', [
            'name' => 'Sample Account',
            'email' => 'sample@example.test',
            'password' => 'a-secure-password',
            'password_confirmation' => 'a-secure-password',
        ]);

        $response->assertRedirect(route('portfolios.index'));
        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', ['email' => 'sample@example.test']);

        $this->post('/logout')->assertRedirect(route('login'));
        $this->assertGuest();

        $this->post('/login', [
            'email' => 'sample@example.test',
            'password' => 'a-secure-password',
        ])->assertRedirect(route('portfolios.index'));
        $this->assertAuthenticated();
    }

    public function test_local_registration_claims_a_pre_sign_in_portfolio(): void
    {
        $this->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class);
        $this->app['env'] = 'local';
        $portfolio = Portfolio::create([
            'user_id' => null,
            'slug' => 'sample-person',
            'full_name' => 'Sample Person',
            'email' => 'person@example.test',
            'template_key' => 'modern',
        ]);

        $this->post('/register', [
            'name' => 'Sample Account',
            'email' => 'sample@example.test',
            'password' => 'a-secure-password',
            'password_confirmation' => 'a-secure-password',
        ])->assertRedirect(route('portfolios.index'));

        $this->assertDatabaseHas('portfolios', ['id' => $portfolio->id, 'user_id' => auth()->id()]);
    }

    public function test_guests_cannot_open_portfolio_management_pages(): void
    {
        $this->get('/portfolios')->assertRedirect('/login');
        $this->get('/portfolios/create')->assertRedirect('/login');
        $this->post('/portfolios', [])->assertRedirect('/login');
    }

    public function test_owner_can_create_update_choose_and_publish_a_portfolio(): void
    {
        Storage::fake('public');
        $owner = User::factory()->create();
        $this->actingAs($owner);

        $this->post('/portfolios', $this->portfolioInput([
            'profile_photo' => $this->fakeImage('profile.gif'),
            'projects' => [[
                'title' => 'Sample project',
                'description' => 'A project description',
                'technologies' => 'PHP, Laravel, MySQL',
                'project_url' => 'https://example.test/project',
                'github_url' => 'https://github.com/example/project',
                'image' => $this->fakeImage('project.gif'),
            ]],
        ]))->assertRedirect(route('portfolios.index'));

        $portfolio = Portfolio::query()->with(['educationEntries', 'skillEntries', 'projects', 'workExperiences', 'socialLinks'])->firstOrFail();
        $this->assertSame($owner->id, $portfolio->user_id);
        $this->assertSame('Sample Person', $portfolio->full_name);
        $this->assertCount(1, $portfolio->educationEntries);
        $this->assertCount(1, $portfolio->skillEntries);
        $this->assertCount(1, $portfolio->projects);
        $this->assertCount(1, $portfolio->workExperiences);
        $this->assertCount(1, $portfolio->socialLinks);
        Storage::disk('public')->assertExists($portfolio->profile_photo_path);
        Storage::disk('public')->assertExists($portfolio->projects[0]->image_path);

        $this->get(route('portfolios.templates', $portfolio))
            ->assertOk()->assertSee('Simple')->assertSee('Modern')->assertSee('Creative')->assertDontSee('Minimal');

        foreach (['modern', 'minimal', 'creative'] as $template) {
            $this->get(route('portfolios.preview', [$portfolio, $template]))
                ->assertOk()
                ->assertSee('Sample Person');
        }

        $this->post(route('portfolios.template.update', $portfolio), ['template_key' => 'creative'])
            ->assertRedirect(route('portfolios.preview', [$portfolio, 'creative']));
        $this->assertDatabaseHas('portfolios', ['id' => $portfolio->id, 'template_key' => 'creative']);
        $this->get(route('portfolios.edit', $portfolio))->assertOk()->assertSee('Sample Person');

        $this->get(route('portfolios.public', $portfolio->slug))->assertNotFound();
        $this->post(route('portfolios.publish', $portfolio))->assertRedirect(route('portfolios.index'));
        $this->get(route('portfolios.public', $portfolio->slug))->assertOk()->assertSee('Sample Person');

        $projectId = $portfolio->projects[0]->id;
        $this->put(route('portfolios.update', $portfolio), $this->portfolioInput([
            'full_name' => 'Updated Sample Person',
            'template_key' => 'minimal',
            'projects' => [[
                'id' => $projectId,
                'title' => 'Updated sample project',
                'description' => 'Updated project description',
                'technologies' => 'PHP, Laravel',
                'project_url' => 'https://example.test/updated',
                'github_url' => 'https://github.com/example/updated',
            ]],
        ]))->assertRedirect(route('portfolios.index'));

        $portfolio->refresh()->load('projects');
        $this->assertSame('Updated Sample Person', $portfolio->full_name);
        $this->assertSame('minimal', $portfolio->template_key);
        $this->assertSame('Updated sample project', $portfolio->projects[0]->title);
        Storage::disk('public')->assertExists($portfolio->profile_photo_path);
        Storage::disk('public')->assertExists($portfolio->projects[0]->image_path);

        $this->post(route('portfolios.publish', $portfolio))->assertRedirect(route('portfolios.index'));
        $this->get(route('portfolios.public', $portfolio->slug))->assertNotFound();

        $profilePhotoPath = $portfolio->profile_photo_path;
        $projectImagePath = $portfolio->projects[0]->image_path;
        $this->delete(route('portfolios.destroy', $portfolio))->assertRedirect(route('portfolios.index'));
        $this->assertDatabaseMissing('portfolios', ['id' => $portfolio->id]);
        Storage::disk('public')->assertMissing($profilePhotoPath);
        Storage::disk('public')->assertMissing($projectImagePath);
    }

    public function test_users_cannot_view_or_change_another_users_portfolio(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $portfolio = Portfolio::create([
            'user_id' => $owner->id,
            'slug' => 'private-sample',
            'full_name' => 'Private Sample',
            'email' => 'private@example.test',
            'template_key' => 'modern',
        ]);

        $this->actingAs($otherUser);
        $this->get(route('portfolios.edit', $portfolio))->assertForbidden();
        $this->get(route('portfolios.preview', [$portfolio, 'modern']))->assertForbidden();
        $this->post(route('portfolios.publish', $portfolio))->assertForbidden();
        $this->put(route('portfolios.update', $portfolio), $this->portfolioInput())->assertForbidden();
        $this->assertDatabaseHas('portfolios', ['id' => $portfolio->id, 'user_id' => $owner->id, 'is_published' => false]);
    }

    public function test_end_date_must_not_precede_start_date(): void
    {
        $this->actingAs(User::factory()->create());
        $payload = $this->portfolioInput([
            'education_entries' => [[
                'school' => 'Sample School',
                'degree' => 'Sample Course',
                'start_date' => '2025-01-01',
                'end_date' => '2024-01-01',
            ]],
        ]);

        $this->post('/portfolios', $payload)
            ->assertSessionHasErrors('education_entries.0.end_date');
        $this->assertDatabaseCount('portfolios', 0);
    }

    private function portfolioInput(array $overrides = []): array
    {
        return array_replace_recursive([
            'full_name' => 'Sample Person',
            'email' => 'person@example.test',
            'contact_number' => '555-0100',
            'address' => 'Sample Address',
            'about_me' => 'A sample biography.',
            'template_key' => 'modern',
            'education_entries' => [[
                'school' => 'Sample School',
                'degree' => 'Sample Course',
                'field_of_study' => 'Computing',
                'start_date' => '2022-01-01',
                'end_date' => '2024-01-01',
                'currently_studying' => '0',
                'description' => 'Sample education.',
            ]],
            'skill_entries' => [['name' => 'PHP', 'level' => 'Advanced']],
            'projects' => [[
                'title' => 'Sample project',
                'description' => 'A project description',
                'technologies' => 'PHP, Laravel, MySQL',
                'project_url' => 'https://example.test/project',
                'github_url' => 'https://github.com/example/project',
            ]],
            'work_experiences' => [[
                'position' => 'Developer',
                'company' => 'Sample Company',
                'start_date' => '2024-01-01',
                'end_date' => null,
                'currently_working' => '1',
                'description' => 'Sample work experience.',
            ]],
            'social_links' => [['platform' => 'GitHub', 'url' => 'https://github.com/example']],
        ], $overrides);
    }

    private function fakeImage(string $name): UploadedFile
    {
        $contents = base64_decode('R0lGODlhAQABAPAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==', true);

        return UploadedFile::fake()->createWithContent($name, $contents);
    }
}
