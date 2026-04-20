import React from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';

function Navigation() {
  const { activeNotes, archivedNotes, searchKeyword, setSearchKeyword } = useNotes();

  return (
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
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 flex-shrink-0">
          <Link to="/" className="flex items-center gap-1">
            <span className="bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">{activeNotes.length}</span>
            <span>Aktif</span>
          </Link>
          <span className="mx-1 text-slate-300">·</span>
          <Link to="/archive" className="flex items-center gap-1">
            <span className="bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">{archivedNotes.length}</span>
            <span>Arsip</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
