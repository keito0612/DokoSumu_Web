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
        $imageName = 'items/' . Str::random(10) . '.jpg';
        $image = $this->faker->image();

        // ファイル名をリネームして保存
        $path =  Storage::disk('public')->putFileAs('reviewImage', new \Illuminate\Http\File($image), $imageName);

        // 保存した画像のURLを取得
        $photoUrl = Storage::disk('public')->url($path);
        return [
              // 外部キーとしてレビューIDを紐付け
            'review_id' => Review::factory(),

            // ダミーの画像URLを生成
            'photo_url' => $photoUrl,
        ];
    }
}
