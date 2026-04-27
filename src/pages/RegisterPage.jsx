import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/notes_api';

function RegisterPage() {
  const navigate = useNavigate();
  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/');
    }
  }

  return (
    <section className="w-full flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-600 shadow-md mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Buat Akun</h2>
          <p className="text-gray-400 text-sm mt-1">Gak perlu serius-serius ya isinya ...</p>
        </div>

        <RegisterInput register={onRegisterHandler} />

        <p className="text-center text-sm text-gray-400 mt-4">
          Sudah punya akun?{' '}
          <Link to="/" className="text-violet-600 font-medium hover:underline">Masuk</Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;