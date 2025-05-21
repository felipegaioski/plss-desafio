<?php

namespace App\Traits;

use Illuminate\Http\Request;

trait ApiQueryBuilder
{
    protected function applyIncludes($query, Request $request)
    {
        if ($request->has('relationships') && !empty($request->get('relationships'))) {
            $relationships = explode(',', $request->get('relationships'));
            $query->with($relationships);
        }
        return $query;
    }

    protected function applyCustomFilters($query, Request $request)
    {
        if (!method_exists($this, 'getCustomFilters')) {
            return $query;
        }

        $filters = $this->getCustomFilters();

        foreach ($request->all() as $key => $value) {
            if (isset($filters[$key]) && !empty($value)) {
                $callback = $filters[$key];

                $input = is_string($value) && $this->isJson($value)
                    ? json_decode($value, true)
                    : $value;

                $query = $callback($query, $key, $input);
            }
        }

        return $query;
    }

    protected function applySorting($query, Request $request)
    {
        if (!$request->has('sort')) {
            return $query;
        }

        if (!method_exists($this, 'getCustomSorts')) {
            return $query;
        }

        $sortOptions = $this->getCustomSorts();
        $sorts = explode(',', $request->get('sort'));

        foreach ($sorts as $sort) {
            $direction = 'asc';

            if (str_starts_with($sort, '-')) {
                $direction = 'desc';
                $sort = substr($sort, 1);
            }

            if (isset($sortOptions[$sort])) {
                $callback = $sortOptions[$sort];
                $query = $callback($query, $direction);
            }
        }

        return $query;
    }

    private function isJson($string)
    {
        json_decode($string);
        return json_last_error() === JSON_ERROR_NONE;
    }
}
