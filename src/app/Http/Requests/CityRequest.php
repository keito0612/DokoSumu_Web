<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class CityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'image_path' => 'image|mimes:jpeg,png,jpg|max:2048'
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
