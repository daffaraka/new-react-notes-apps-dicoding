import { useNotes } from './context/NotesContext';
import NotesList from './components/NotesList';
import NoteInput from './components/NoteInput';
import NotesDetailModal from './components/NotesDetailModal';

function Homepage() {
  const { activeNotes, archivedNotes, searchKeyword, onAdd, onDelete, onArchive, onOpenDetail, onCloseDetail, selectedNote } = useNotes();

  return (


    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" data-testid="note-app">
      <main
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8"
        data-testid="note-app-body"
      >
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          <aside className="w-full lg:w-80 lg:sticky lg:top-24 flex-shrink-0">
            <NoteInput addNote={onAdd} />
          </aside>

          <div className="flex-1 min-w-0 space-y-8">
            <section aria-labelledby="active-notes-title" data-testid="active-notes-section">
              <div className="flex items-center gap-2 mb-4">
                <h2 id="active-notes-title" className="text-base font-bold text-slate-700">Catatan Aktif</h2>
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">{activeNotes.length}</span>
              </div>


              {activeNotes.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 text-center">

                  <div className="bg-red-300"></div>
                  <p className="text-red-800">Tidak ada catatan Aktif</p>
                </div>
              ) : (
                <NotesList notes={activeNotes} onDetail={onOpenDetail} onDelete={onDelete} onArchive={onArchive} dataTestId="active-notes-list" searchKeyword={searchKeyword} />
              )

              }
            </section>

            <section aria-labelledby="archived-notes-title" data-testid="archived-notes-section">
              <div className="flex items-center gap-2 mb-4">
                <h2 id="archived-notes-title" className="text-base font-bold text-slate-700">Arsip</h2>
                <span className="bg-slate-200 text-slate-600 text-xs font-semibold px-2 py-0.5 rounded-full">{archivedNotes.length}</span>
              </div>

              {archivedNotes.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 text-center">
                  <p className="text-slate-500">Tidak ada catatan di arsip</p>
                </div>
              ) : (

                <div className="bg-gray-200 rounded-md p-4 shadow-lg border border-gray-400">
                  <NotesList notes={archivedNotes} onDetail={onOpenDetail} onDelete={onDelete} onArchive={onArchive} dataTestId="archived-notes-list" searchKeyword={searchKeyword} />

                </div>

              )}
            </section>
          </div>
        </div>
      </main>

      {selectedNote && (
        <NotesDetailModal note={selectedNote} onClose={onCloseDetail} />
      )}
    </div>
  );
}

export default Homepage;
