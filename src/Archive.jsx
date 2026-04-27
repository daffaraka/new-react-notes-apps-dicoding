import React from 'react';
import { useNotes } from './context/NotesContext';
import NotesList from './components/NotesList';

function Archive() {
  const { archivedNotes, searchKeyword, onDelete, onArchive } = useNotes();

  
  return (

    

    
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" data-testid="note-app">
      <main
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8"
        data-testid="note-app-body"
      >
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-base font-bold text-slate-700">Arsip</h2>
          <span className="bg-slate-200 text-slate-600 text-xs font-semibold px-2 py-0.5 rounded-full">{archivedNotes.length}</span>
        </div>
        <NotesList notes={archivedNotes} onDelete={onDelete} onArchive={onArchive} dataTestId="archived-notes-list" searchKeyword={searchKeyword} />
      </main>
    </div>
  );
}

export default Archive;
