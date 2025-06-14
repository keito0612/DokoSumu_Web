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
        Schema::table('reviews', function (Blueprint $table) {
            $table->text('good_comment')->nullable(true)->comment('良いところ')->change();
            $table->text('bad_comment')->nullable(true)->comment('悪いところ')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->text('good_comment')->nullable(false)->comment('良いところ')->change();
            $table->text('bad_comment')->nullable(false)->comment('悪いところ')->change();
        });
    }
};
