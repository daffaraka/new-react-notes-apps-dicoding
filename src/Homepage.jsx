import React from 'react';
import { withNotes } from './context/NotesContext';
import { ThemeConsumer } from './context/ThemesContext';
import NotesList from './components/NotesList';
import NoteInput from './components/NoteInput';
import NotesDetailModal from './components/NotesDetailModal';

class Homepage extends React.Component {
  render() {
    const { activeNotes, archivedNotes, searchKeyword, onAdd, onDelete, onArchive, onOpenDetail, onCloseDetail, selectedNote } = this.props.notes;

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <div
            className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800'}`}
            data-testid="note-app"
          >
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8" data-testid="note-app-body">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

                <aside className="w-full lg:w-80 lg:sticky lg:top-24 shrink-0">
                  <NoteInput addNote={onAdd} />
                </aside>

                <div className="flex-1 min-w-0 space-y-8">
                  <section aria-labelledby="active-notes-title" data-testid="active-notes-section">
                    <div className="flex items-center gap-2 mb-4">
                      <h2 id="active-notes-title" className={`text-base font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                        Catatan Aktif
                      </h2>
                      <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {activeNotes.length}
                      </span>
                    </div>

                    {activeNotes.length === 0 ? (
                      <div className={`rounded-xl shadow-sm border p-6 text-center ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'}`}>
                        <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Tidak ada catatan aktif</p>
                      </div>
                    ) : (
                      <NotesList notes={activeNotes} onDetail={onOpenDetail} onDelete={onDelete} onArchive={onArchive} dataTestId="active-notes-list" searchKeyword={searchKeyword} />
                    )}
                  </section>

                  <section aria-labelledby="archived-notes-title" data-testid="archived-notes-section">
                    <div className="flex items-center gap-2 mb-4">
                      <h2 id="archived-notes-title" className={`text-base font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                        Arsip
                      </h2>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>
                        {archivedNotes.length}
                      </span>
                    </div>

                    {archivedNotes.length === 0 ? (
                      <div className={`rounded-xl shadow-sm border p-6 text-center ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'}`}>
                        <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Tidak ada catatan di arsip</p>
                      </div>
                    ) : (
                      <div className={`rounded-xl p-4 shadow-sm border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-slate-100 border-slate-200'}`}>
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
        )}
      </ThemeConsumer>
    );
  }
}

export default withNotes(Homepage);
