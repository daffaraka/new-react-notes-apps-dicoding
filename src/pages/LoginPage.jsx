import React from "react";
import PropTypes from "prop-types";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/notes_api";
import { useNavigate } from "react-router-dom";

function LoginPage({ loginSuccess }) {

    const navigate = useNavigate();


    async function onLogin({ email, password }) {
        const { error, data } = await login({ email, password })

        if (!error) {
            loginSuccess(data,navigate);
        }

    }


    return (
        <div className="min-xl-screen bg-linear-to-br from-violet-50 via-white to-indigo-50 flex flex-col">
            <div className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-sm bg-white border border-gray-300 shadow rounded-2xl shadow-sm p-6 sm:p-8 bopr">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-600 shadow-md mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Masuk ke Akun</h2>
                        <p className="text-gray-400 text-sm mt-1">Gak perlu serius-serius ya isinya ...</p>
                    </div>

                    <LoginInput login={onLogin} />

                    <p className="text-center text-sm text-gray-400 mt-4">
                        Belum punya akun?
                        <button onClick={() => window.location.href = '/register'} className="text-violet-600 font-medium hover:underline ">Daftar</button>
                    </p>
                </div>
            </div>
        </div>
    )

}


LoginPage.PropTypes = {
    loginSuccess: PropTypes.func.isRequired,
}

export default LoginPage;