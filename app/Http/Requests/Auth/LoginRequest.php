<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use DB;

class LoginRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'user' => ['required', 'string'],
            'password' => ['required', 'string'],
        ];
    }

    public function authenticate($userName, $password, $remember)
    {
        $this->ensureIsNotRateLimited();

        $data=DB::select('exec login ?,?',[$userName, $password]);

        if(!empty($data)){
            if($data[0]->clave == 1){
                if(User::getAuth($userName, 2))
                {
                    Auth::loginUsingId($data[0]->principal_id, $remember);
                } else {
                    throw ValidationException::withMessages([
                        'password'=>'No tienes Privilegios',
                    ]);
                }
            } else {
                throw ValidationException::withMessages([
                        'password'=>'Clave Incorrecta',
                    ]);
            }
        } else {
            throw ValidationException::withMessages([
                'user'=>'Usuario Incorrecto',
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

    public function ensureIsNotRateLimited()
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'user' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    public function throttleKey()
    {
        return Str::lower($this->input('user')).'|'.$this->ip();
    }
}
