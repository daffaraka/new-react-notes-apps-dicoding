import React from 'react';

function NoteActionButton({ variant, onClick, dataTestId }) {
  const styles = {
    delete: 'text-slate-400 hover:text-red-500 hover:bg-red-50',
    archive: 'text-slate-400 hover:text-amber-500 hover:bg-amber-50',
    unarchive: 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-50',
  };
  const labels = {
    delete: 'Hapus',
    archive: 'Arsipkan',
    unarchive: 'Aktifkan',
  };
  const icons = {
    delete: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    archive: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    unarchive: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  };

  return (
    <button
      type="button"
      title={labels[variant]}
      className={`p-1.5 rounded-lg transition-colors ${styles[variant]}`}
      onClick={onClick}
      data-testid={dataTestId}
    >
      {icons[variant]}
    </button>
  );
}

export default NoteActionButton;
