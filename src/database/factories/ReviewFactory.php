<?php

namespace Database\Factories;

use App\Models\City;
use App\Models\Prefecture;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     *
     * @return array<string, mixed>
     */
    protected $model = Review::class;
    public function definition(): array
    {
        $prefecture_id = Prefecture::inRandomOrder()->first()->id;

        // 取得した都道府県に紐づく市のIDをランダムに取得
        $city_id = City::where('prefecture_id', $prefecture_id)->inRandomOrder()->first()->id;

        // 既存のユーザーのIDをランダムに取得
        $user_id = User::inRandomOrder()->first()->id;
        return [
            // 既存のIDからランダムに選択して紐付け
            'user_id' => $user_id,
            'prefecture_id' => $prefecture_id,
            'city_id' => $city_id,

            // Fakerでダミーコメントを生成
            'good_comment' => $this->faker->realText(200),
            'bad_comment' => $this->faker->realText(200),
        ];
    }
}
