<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        DB::table('reviews')->insert(
            [
                "prefecture_id" => 1,
                "city_id" => 1,
                "user_id" => 1,
                "good_comment" => "とても良かった。",
                "bad_comment" => "迷惑な外国人が多くて嫌だった。",
                "created_at" => $now,
            ]
        );
    }
}
