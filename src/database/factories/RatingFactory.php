<?php

namespace Database\Factories;

use App\Models\Rating;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rating>
 */
class RatingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Rating::class;

    public function definition(): array
    {
        // 各評価項目に1〜5のランダムな値を設定
        $livability = $this->faker->numberBetween(1, 5);
        $cityPolicies = $this->faker->numberBetween(1, 5);
        $childRearing = $this->faker->numberBetween(1, 5);
        $safety = $this->faker->numberBetween(1, 5);
        $publicTransportation = $this->faker->numberBetween(1, 5);

        // 平均評価を計算（四捨五入）
        $averageRating = round(($livability + $cityPolicies + $childRearing + $safety + $publicTransportation) / 5, 1);

        return [
            // 各評価項目
            'livability' => $livability,
            'city_policies' => $cityPolicies,
            'child_rearing' => $childRearing,
            'safety' => $safety,
            'public_transportation' => $publicTransportation,
            // 計算によって平均評価を生成
            'average_rating' => $averageRating,
        ];
    }
}
