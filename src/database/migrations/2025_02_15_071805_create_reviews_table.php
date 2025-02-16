<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->comment("ユーザーID")->constrained()->onDelete('cascade');
            $table->foreignId('prefecture_id')->comment("県のID")->constrained()->onDelete('cascade');
            $table->foreignId('citie_id')->comment("市のID")->constrained()->onDelete('cascade');
            $table->foreignId('photo_id')->comment("写真のID")->constrained()->onDelete('cascade');
            $table->foreignId('rating_id')->comment("評価のID")->constrained()->onDelete('cascade');
            $table->text('good_comment')->comment('良いところ');
            $table->text('bad_comment')->comment('悪いところ');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
