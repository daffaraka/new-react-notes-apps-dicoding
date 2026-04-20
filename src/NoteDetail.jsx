import { useParams, useNavigate } from 'react-router-dom';
import { useNotes } from './context/NotesContext';
import { showFormattedDate } from './utils';

function NoteDetail() {
  const { id } = useParams();
  const { activeNotes, archivedNotes, onDelete, onArchive } = useNotes();
  const navigate = useNavigate();

  const note = [...activeNotes, ...archivedNotes].find((n) => String(n.id) === id);

  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Catatan tidak ditemukan.</p>
          <button onClick={() => navigate('/')} className="text-blue-600 hover:underline text-sm">
            Kembali ke beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />
          <div className="p-6">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h1 className="text-xl font-bold text-slate-800">{note.title}</h1>
              {note.archived && (
                <span className="text-xs bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded-full shrink-0">
                  Arsip
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mb-6">{showFormattedDate(note.createdAt)}</p>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{note.body}</p>

            <div className="flex gap-2 mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => { onArchive(note.id); navigate(-1); }}
                className="px-4 py-2 text-sm rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                {note.archived ? 'Batalkan Arsip' : 'Arsipkan'}
              </button>
              <button
                onClick={() => { onDelete(note.id); navigate('/'); }}
                className="px-4 py-2 text-sm rounded-xl bg-red-50 border border-red-100 text-red-600 hover:bg-red-100"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NoteDetail;
