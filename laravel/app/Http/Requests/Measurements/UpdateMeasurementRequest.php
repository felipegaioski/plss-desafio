<?php

namespace App\Http\Requests\Measurements;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMeasurementRequest extends FormRequest
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
            'amount' => ['required', 'numeric', 'min:0'],
            'unit_id' => ['required', 'exists:units,id'],
            'construction_id' => ['required', 'exists:constructions,id'],
            'observation' => 'nullable',
            'measured_at' => ['required', 'date'],
        ];
    }

    public function messages(): array
    {
        return [
            'amount.required' => 'O campo "Medida" é obrigatório.',
            'amount.numeric' => 'O campo "Medida" deve ser um número.',
            'amount.min' => 'O campo "Medida" deve ser maior que 0.',
            'unit_id.required' => 'O campo unidade é obrigatório.',
            'unit_id.exists' => 'Unidade inválida',
            'construction_id.required' => 'O campo "Obra" é obrigatório.',
            'construction_id.exists' => 'Obra inválida.',
            'measured_at.required' => 'O campo "Data de medição" é obrigatório.',
            'measured_at.date' => 'Data de medição inválida.',
        ];
    }
}
