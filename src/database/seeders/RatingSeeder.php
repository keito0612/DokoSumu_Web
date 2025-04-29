<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ratings')->insert([
            "review_id" => 1,
            "livability" => 2,
            "city_policies" => 3,
            "child_rearing" => 3,
            "safety" => 3,
            "public_transportation" => 3
        ]);
    }
}
