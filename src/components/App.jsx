import React from 'react';
import { getInitialData } from '../utils';
import NoteInput from './NoteInput';
import NotesList from './NotesList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      searchKeyword: '',
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prev) => ({
      notes: [
        ...prev.notes,
        { id: +new Date(), title, body, createdAt: new Date().toISOString(), archived: false },
      ],
    }));
  }

  onDeleteHandler(id) {
    this.setState((prev) => ({ notes: prev.notes.filter((n) => n.id !== id) }));
  }

  onArchiveHandler(id) {
    this.setState((prev) => ({
      notes: prev.notes.map((n) => (n.id === id ? { ...n, archived: !n.archived } : n)),
    }));
  }

  onSearchHandler(keyword) {
    this.setState({ searchKeyword: keyword });
  }

  render() {
    const { notes, searchKeyword } = this.state;

    const filteredNotes = notes.filter((n) =>
      n.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    const activeNotes = filteredNotes
      .filter((n) => !n.archived)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const archivedNotes = filteredNotes
      .filter((n) => n.archived)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" data-testid="note-app">

        {/* Header */}
        <header
          className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm"
          data-testid="note-app-header"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">My Notes</h1>
            </div>

            <div className="relative flex-1 sm:max-w-xs lg:max-w-sm">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Cari catatan..."
                value={searchKeyword}
                onChange={(e) => this.onSearchHandler(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 flex-shrink-0">
              <span className="bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">{activeNotes.length}</span>
              <span>aktif</span>
              <span className="mx-1 text-slate-300">·</span>
              <span className="bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">{archivedNotes.length}</span>
              <span>arsip</span>
            </div>
          </div>
        </header>

        {/* Body */}
        <main
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8"
          data-testid="note-app-body"
        >
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

            {/* Sidebar: Form input */}
            <aside className="w-full lg:w-80 lg:sticky lg:top-24 flex-shrink-0">
              <NoteInput addNote={this.onAddNoteHandler} />
            </aside>

            {/* Main content: Notes list */}
            <div className="flex-1 min-w-0 space-y-8">
              <section aria-labelledby="active-notes-title" data-testid="active-notes-section">
                <div className="flex items-center gap-2 mb-4">
                  <h2 id="active-notes-title" className="text-base font-bold text-slate-700">
                    Catatan Aktif
                  </h2>
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {activeNotes.length}
                  </span>
                </div>
                <NotesList
                  notes={activeNotes}
                  onDelete={this.onDeleteHandler}
                  onArchive={this.onArchiveHandler}
                  dataTestId="active-notes-list"
                />
              </section>

              <section aria-labelledby="archived-notes-title" data-testid="archived-notes-section">
                <div className="flex items-center gap-2 mb-4">
                  <h2 id="archived-notes-title" className="text-base font-bold text-slate-700">
                    Arsip
                  </h2>
                  <span className="bg-slate-200 text-slate-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {archivedNotes.length}
                  </span>
                </div>
                <NotesList
                  notes={archivedNotes}
                  onDelete={this.onDeleteHandler}
                  onArchive={this.onArchiveHandler}
                  dataTestId="archived-notes-list"
                />
              </section>
            </div>

          </div>
        </main>
      </div>
    );
  }
}

export default App;
