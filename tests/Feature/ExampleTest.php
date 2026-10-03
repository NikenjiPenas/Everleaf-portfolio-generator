<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_homepage_is_available_to_guests(): void
    {
        $response = $this->get('/');

        $response->assertOk()
            ->assertSee('Create Your')
            ->assertSee('Professional Portfolio')
            ->assertSee('View Templates')
            ->assertSee('Simple')
            ->assertSee('Modern')
            ->assertSee('Creative');
    }
}
