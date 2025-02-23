<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ReviewRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image_path' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ];
    }

    public function messages(): array
    {
        return [
            'image_path.image' => '画像ファイルを選択してください。',
            'image_path.mimes' => '画像の形式はjpeg、png、jpg、gifのいずれかにしてください。',
            'image_path.max' => '画像のサイズは2MB以内にしてください。',

        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $res = response()->json(
            [
                'errors' => $validator->errors(),
            ],
            400
        );
        throw new HttpResponseException($res);
    }
}
