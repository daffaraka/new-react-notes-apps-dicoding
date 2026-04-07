import React from 'react';
import { showFormattedDate } from '../utils';

function NoteActionButton({ label, onClick, variant, dataTestId }) {
  const styles = {
    delete: 'text-slate-400 hover:text-red-500 hover:bg-red-50',
    archive: 'text-slate-400 hover:text-amber-500 hover:bg-amber-50',
    unarchive: 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-50',
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
      title={label}
      className={`p-1.5 rounded-lg transition-colors ${styles[variant]}`}
      onClick={onClick}
      data-testid={dataTestId}
    >
      {icons[variant]}
    </button>
  );
}

function NoteItem({ note, onDelete, onArchive }) {
  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col ${
        note.archived ? 'border-slate-200 opacity-75' : 'border-slate-200 hover:border-blue-200'
      }`}
      data-testid="note-item"
      data-note-id={note?.id}
    >
      {/* Accent bar */}
      <div className={`h-1 w-full rounded-t-2xl ${note.archived ? 'bg-slate-300' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`} />

      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Content */}
        <div className="note-item__content flex-1" data-testid="note-item-content">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="note-item__title text-sm font-bold text-slate-800 leading-snug line-clamp-2"
              data-testid="note-item-title"
            >
              {note.title}
            </h3>
            {note.archived && (
              <span className="flex-shrink-0 text-xs bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded-full">
                Arsip
              </span>
            )}
          </div>
          <p className="note-item__date text-xs text-slate-400 mt-1" data-testid="note-item-date">
            {showFormattedDate(note.createdAt)}
          </p>
          <p
            className="note-item__body text-sm text-slate-600 mt-2 leading-relaxed line-clamp-4"
            data-testid="note-item-body"
          >
            {note.body}
          </p>
        </div>

        {/* Actions */}
        <div
          className="note-item__action flex items-center justify-end gap-1 pt-2 border-t border-slate-100"
          data-testid="note-item-action"
        >
          <NoteActionButton
            label="Hapus"
            variant="delete"
            onClick={() => onDelete(note.id)}
            dataTestId="note-item-delete-button"
          />
          <NoteActionButton
            label={note.archived ? 'Aktifkan' : 'Arsipkan'}
            variant={note.archived ? 'unarchive' : 'archive'}
            onClick={() => onArchive(note.id)}
            dataTestId="note-item-archive-button"
          />
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
