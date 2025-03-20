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
            'safety' => 'required|integer|in:0,1,2,3,4,5',
            'childRearing' => 'required|integer|in:0,1,2,3,4,5',
            'cityPolicies' => 'required|integer|in:0,1,2,3,4,5',
            'publicTransportation' => 'required|integer|in:0,1,2,3,4,5',
            'livability' =>'required|integer|in:0,1,2,3,4,5',
            'image_path' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'goodComment' => 'max:300',
            'badComment' => 'max:300',
        ];
    }

    public function messages(): array
    {
        return [
            'safety.required' => '評価は必須です。',
            'safety.in' => '評価は0から5段階まででお願いします。',
            'cityPolicies.required' => '評価は必須です。',
            'cityPolicies.in' => '評価は0から5段階まででお願いします。',
            'publicTransportation.required' => '評価は必須です。',
            'publicTransportation.in' => '評価は0から5段階まででお願いします。',
            'livability.required' => '評価は必須です。',
            'livability.in' => '評価は0から5段階まででお願いします。',
            'image_path.image' => '画像ファイルを選択してください。',
            'image_path.mimes' => '画像の形式はjpeg、png、jpg、gifのいずれかにしてください。',
            'image_path.max' => '画像のサイズは2MB以内にしてください。',
            'goodComment' =>'文字数は300文字以内でお願いします。',
            'badComment' => '文字数は300文字以内でお願いします。'
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
