<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('portfolios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('slug')->unique();
            $table->string('full_name');
            $table->string('email');
            $table->string('contact_number', 40)->nullable();
            $table->text('address')->nullable();
            $table->longText('about_me')->nullable();
            $table->string('profile_photo_path')->nullable();
            $table->string('template_key', 40)->default('modern');
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolios');
    }
};
