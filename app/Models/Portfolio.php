<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Portfolio extends Model
{
    protected $fillable = [
        'user_id',
        'slug',
        'full_name',
        'email',
        'contact_number',
        'address',
        'about_me',
        'profile_photo_path',
        'template_key',
        'is_published',
    ];

    protected function casts(): array
    {
        return ['is_published' => 'boolean'];
    }

    public static function createSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name) ?: 'portfolio';
        $slug = $base;
        $suffix = 2;

        while (static::query()
            ->where('slug', $slug)
            ->when($ignoreId !== null, fn ($query) => $query->whereKeyNot($ignoreId))
            ->exists()) {
            $slug = $base.'-'.$suffix++;
        }

        return $slug;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function educationEntries(): HasMany
    {
        return $this->hasMany(EducationEntry::class)->orderBy('sort_order')->orderBy('id');
    }

    public function skillEntries(): HasMany
    {
        return $this->hasMany(SkillEntry::class)->orderBy('sort_order')->orderBy('id');
    }

    public function projects(): HasMany
    {
        return $this->hasMany(PortfolioProject::class)->orderBy('sort_order')->orderBy('id');
    }

    public function workExperiences(): HasMany
    {
        return $this->hasMany(WorkExperience::class)->orderBy('sort_order')->orderBy('id');
    }

    public function socialLinks(): HasMany
    {
        return $this->hasMany(SocialLink::class)->orderBy('sort_order')->orderBy('id');
    }
}
