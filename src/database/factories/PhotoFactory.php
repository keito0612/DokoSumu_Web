<?php

namespace Database\Factories;

use App\Models\Photo;
use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\Factory;
use Mmo\Faker\PicsumProvider;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\photo>
 */
class PhotoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Photo::class;
   public function definition(): array
   {
       // https://picsum.photos/ のランダム画像URLをそのまま入れる
        $randomId = $this->faker->numberBetween(1, 1000);
        return [
            'review_id' => Review::factory(),
            'photo_url' => "https://picsum.photos/id/{$randomId}/640/480",
        ];
    }
}
