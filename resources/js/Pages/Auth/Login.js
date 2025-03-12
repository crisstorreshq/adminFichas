import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/inertia-react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        user: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                    <h2 className="text-center text-2xl font-bold mb-4">Iniciar sesión</h2>

                    {status && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{status}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700">Usuario</label>
                            <input
                                type="text"
                                name="user"
                                value={data.user}
                                onChange={(e) => setData('user', e.target.value)}
                                className="border rounded w-full p-2"
                                required
                            />
                            {errors.user && <p className="text-red-600 text-sm">{errors.user}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium text-gray-700">Clave</label>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="border rounded w-full p-2"
                                required
                            />
                            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
                        </div>

                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="mr-2"
                            />
                            <span className="text-sm text-gray-600">Recordarme</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            disabled={processing}
                        >
                            {processing ? "Ingresando..." : "Iniciar sesión"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
