<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PortfolioProject extends Model
{
    protected $fillable = [
        'title',
        'description',
        'technologies',
        'project_url',
        'github_url',
        'image_path',
        'sort_order',
    ];

    protected function casts(): array
    {
        return ['technologies' => 'array'];
    }

    public function portfolio(): BelongsTo
    {
        return $this->belongsTo(Portfolio::class);
    }
}
