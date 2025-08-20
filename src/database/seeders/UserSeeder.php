<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert(
            [
                'id' => 1,
                'name'=> "テスト",
                'email' => "test@gmail.com",
                'password' => bcrypt('password'),
            ]
        );
        User::factory(50)->create();
    }
}
