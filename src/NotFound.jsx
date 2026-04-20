import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-blue-200 mb-4">404</h1>
        <p className="text-slate-700 font-semibold text-lg mb-1">Halaman tidak ditemukan</p>
        <p className="text-slate-400 text-sm mb-6">URL yang kamu akses tidak tersedia.</p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          Kembali ke beranda
        </button>
      </div>
    </div>
  );
}

export default NotFound;
    