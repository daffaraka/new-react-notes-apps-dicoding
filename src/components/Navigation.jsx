import React from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';
import { ThemeConsumer } from '../context/ThemesContext';
import ToggleTheme from './ToggleTheme';

function Navigation({ onLogout }) {
  const { activeNotes, archivedNotes, searchKeyword, setSearchKeyword } = useNotes();

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <header
          className={`sticky top-0 z-10 backdrop-blur-md border-b shadow-sm transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900/90 border-gray-700' : 'bg-white/80 border-slate-200'}`}
          data-testid="note-app-header"
        >
          {/* Row 1: logo | links | logout */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">

            {/* Kiri: My Notes */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h1 className={`text-lg font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>My Notes</h1>
            </div>

            {/* Tengah: Aktif & Arsip */}
            <div className="flex items-center gap-3 text-xs">
              <Link to="/" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${theme === 'dark' ? 'hover:bg-gray-700 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}>
                <span className="bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">{activeNotes.length}</span>
                <span className="font-medium">Aktif</span>
              </Link>
              <span className={theme === 'dark' ? 'text-gray-600' : 'text-slate-300'}>·</span>
              <Link to="/archive" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${theme === 'dark' ? 'hover:bg-gray-700 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}>
                <span className={`font-semibold px-2 py-0.5 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>{archivedNotes.length}</span>
                <span className="font-medium">Arsip</span>
              </Link>
            </div>

            {/* Kanan: ToggleTheme + Logout */}
            <div className="flex items-center gap-2">
              <ToggleTheme />
              <button
                onClick={onLogout}
                className="text-sm text-red-500 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
              >
                Logout
              </button>
            </div>

          </div>

          {/* Row 2: Search */}
          <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-slate-100'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="Cari catatan..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all ${theme === 'dark' ? 'bg-gray-800 text-slate-200 placeholder-slate-500 focus:bg-gray-700' : 'bg-slate-100 text-slate-700 placeholder-slate-400 focus:bg-white focus:border-blue-300'}`}
                />
              </div>
            </div>
          </div>

        </header>
      )}
    </ThemeConsumer>
  );
}

export default Navigation;
