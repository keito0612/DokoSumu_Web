<?php

namespace Database\Seeders;

use App\Models\Photo;
use App\Models\Rating;
use App\Models\Review;
use App\Models\User;
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
        $userCount = User::count();

        // 各ユーザーが平均して3つのレビューを持つように計算し、まとめて作成
        $totalReviews = $userCount * 3;

        Review::factory($totalReviews)
            ->has(Rating::factory())
            ->has(Photo::factory(4))
            ->create();
    }
}
