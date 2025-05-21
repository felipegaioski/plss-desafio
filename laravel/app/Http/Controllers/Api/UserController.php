<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\ApiQueryBuilder;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Requests\Users\StoreUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;

class UserController extends Controller
{
    use ApiQueryBuilder;

    protected function getCustomFilters()
    {
        return [
            'id' => function ($query, $key, $input) {
                return $query->where('id', $input);
            },
            'name' => function ($query, $key, $input) {
                return $query->where('name', 'like', '%' . $input . '%');
            },
            'email' => function ($query, $key, $input) {
                return $query->where('email', 'like', '%' . $input . '%');
            },
        ];
    }
    
    /**
     * Display a listing of the resource.
     * @return Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return UserResource::collection(User::query()->orderBy('id', 'desc')->paginate(10));
    }

    public function get(Request $request)
    {
        $query = User::query();
        $query = $this->applyIncludes($query, $request);
        $query = $this->applyCustomFilters($query, $request);
        $query = $this->applySorting($query, $request);
        $users = $query->paginate(10);

        return response()->json([
            'error' => false,
            'users' => $users,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        try {
            DB::beginTransaction();

            $data = $request->validated();
            $data['password'] = bcrypt($data['password']);

            $user = User::create($data);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack(); 
        }
        
        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            DB::beginTransaction();

            $data = $request->validated();

            if (isset($data['password'])) {
                $data['password'] = bcrypt($data['password']);
            }

            $user->update($data);
            
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return response(new UserResource($user), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            DB::beginTransaction();

            $user->delete();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return response('', 204);
    }
}
