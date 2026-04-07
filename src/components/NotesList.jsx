import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, dataTestId = 'notes-list' }) {
  const hasNotes = Array.isArray(notes) && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <div className="flex flex-col items-center justify-center py-10 px-4 rounded-2xl border-2 border-dashed border-slate-200 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p
            className="notes-list__empty-message text-sm font-medium text-slate-500"
            data-testid={`${dataTestId}-empty`}
          >
            Belum ada catatan
          </p>
          <p className="text-xs text-slate-400 mt-1">Catatan yang kamu buat akan muncul di sini.</p>
        </div>
      </div>
    );
  }

  const groups = notes.reduce((acc, note) => {
    const key = new Date(note.createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    if (!acc[key]) acc[key] = [];
    acc[key].push(note);
    return acc;
  }, {});

  return (
    <div className="notes-list space-y-6" data-testid={dataTestId}>
      {Object.entries(groups).map(([monthYear, groupNotes]) => (
        <section key={monthYear} className="notes-group">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap">
              {monthYear}
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {groupNotes.map((note) => (
              <NoteItem key={note.id} note={note} onDelete={onDelete} onArchive={onArchive} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;
