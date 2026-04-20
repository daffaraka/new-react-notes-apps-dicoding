import { showFormattedDate } from '../utils';
import { useNavigate } from 'react-router-dom';
import NoteActionButton from './NoteActionButton';

function highlightText(text, keyword) {
  if (!keyword || !keyword.trim()) return text;
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">{part}</mark> : part
  );
}

function NoteItem({ note, onDelete, onArchive, searchKeyword = '' }) {
  const navigate = useNavigate();

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col ${
        note.archived ? 'border-slate-200 opacity-75' : 'border-slate-200 hover:border-blue-200'
      }`}
      data-testid="note-item"
      data-note-id={note?.id}
    >
      <div className={`h-1 w-full rounded-t-2xl ${note.archived ? 'bg-slate-300' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`} />

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="note-item__content flex-1" data-testid="note-item-content">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="note-item__title text-sm font-bold text-slate-800 leading-snug line-clamp-2"
              data-testid="note-item-title"
            >
              {highlightText(note.title, searchKeyword)}
            </h3>
            {note.archived && (
              <span className="shrink-0 text-xs bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded-full">
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
            {highlightText(note.body, searchKeyword)}
          </p>
        </div>

        <div
          className="note-item__action flex items-center justify-end gap-1 pt-2 border-t border-slate-100"
          data-testid="note-item-action"
        >
          <NoteActionButton
            variant="detail"
            onClick={() => navigate(`/notes/${note.id}`)}
            dataTestId="note-item-detail-button"
          />
          <NoteActionButton
            variant="delete"
            onClick={() => onDelete(note.id)}
            dataTestId="note-item-delete-button"
          />
          <NoteActionButton
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
