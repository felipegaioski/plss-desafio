<?php

namespace App\Http\Requests\Constructions;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConstructionRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'description' => 'nullable',
            'address' => 'nullable',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O campo "Nome" é obrigatório.',
            'name.string' => 'O campo "Nome" deve ser uma string.',
            'name.max' => 'O campo "Nome" deve ter no máximo 255 caracteres.',
        ];
    }
}
