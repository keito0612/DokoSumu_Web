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
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->integer('livability')->comment('住みやすさ');
            $table->integer('city_policies')->comment('市の制度');
            $table->integer('rent_affordability')->comment('家賃の安さ');
            $table->integer('safety')->comment('治安');
            $table->integer('public_transportation')->comment('交通機関');
            $table->foreignId('review_id')->comment("レビューのID")->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};
