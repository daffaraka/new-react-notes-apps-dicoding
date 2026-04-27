import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from './utils/notes_api';
import { showFormattedDate } from './utils';
import { ThemeConsumer } from './context/ThemesContext';

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNote(id).then(({ error, data }) => {
      if (!error) setNote(data);
      setLoading(false);
    });
  }, [id]);

  async function handleDelete() {
    await deleteNote(id);
    navigate('/');
  }

  async function handleArchive() {
    if (note.archived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }
    navigate(-1);
  }

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
          <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
            <button
              onClick={() => navigate(-1)}
              className={`flex items-center gap-1.5 text-sm mb-6 ${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali
            </button>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : !note ? (
              <div className="text-center py-20">
                <p className={`mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Catatan tidak ditemukan.</p>
                <button onClick={() => navigate('/')} className="text-blue-600 hover:underline text-sm">Kembali ke beranda</button>
              </div>
            ) : (
              <div className={`rounded-2xl border overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'}`}>
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{note.title}</h1>
                    {note.archived && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${theme === 'dark' ? 'bg-gray-700 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>
                        Arsip
                      </span>
                    )}
                  </div>
                  <p className={`text-xs mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-400'}`}>{showFormattedDate(note.createdAt)}</p>
                  <p className={`leading-relaxed whitespace-pre-line ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{note.body}</p>

                  <div className={`flex gap-2 mt-8 pt-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-slate-100'}`}>
                    <button
                      onClick={handleArchive}
                      className={`px-4 py-2 text-sm rounded-xl border ${theme === 'dark' ? 'border-gray-600 text-slate-300 hover:bg-gray-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      {note.archived ? 'Batalkan Arsip' : 'Arsipkan'}
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 text-sm rounded-xl bg-red-50 border border-red-100 text-red-600 hover:bg-red-100"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </ThemeConsumer>
  );
}

export default NoteDetail;
