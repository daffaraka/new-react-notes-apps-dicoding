import { createContext, useContext, useEffect, useState } from 'react';
import { getActiveNotes, getArchivedNotes } from '../utils/notes_api.js';
const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedNote, setSelectedNote] = useState(null)

  useEffect(() => {
    Promise.all([getActiveNotes(), getArchivedNotes()]).then(
      ([{ error: e1, data: activeData }, { error: e2, data: archivedData }]) => {
        const combined = [
          ...(!e1 ? activeData : []),
          ...(!e2 ? archivedData : []),
        ];
        setNotes(combined);
      }
    );
  }, []);

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const activeNotes = filteredNotes
    .filter((n) => !n.archived)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const archivedNotes = filteredNotes
    .filter((n) => n.archived)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const onOpenDetail = (id) => {
    const note = [...activeNotes, ...archivedNotes].find((n) => n.id === id);
    setSelectedNote(note);

  }

  const onCloseDetail = () => setSelectedNote(null)


  function onAdd({ title, body }) {
    setNotes((prev) => [
      ...prev,
      { id: `notes-${+new Date()}`, title, body, createdAt: new Date().toISOString(), archived: false },
    ]);
  }

  function onDelete(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function onArchive(id) {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, archived: !n.archived } : n)));
  }

  return (
    <NotesContext.Provider value={{ filteredNotes, activeNotes, archivedNotes, searchKeyword, setSearchKeyword, onAdd, onDelete, onArchive, onOpenDetail, onCloseDetail, selectedNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => useContext(NotesContext);

export function withNotes(Component) {
  return function WrappedComponent(props) {
    const notes = useNotes();
    return <Component {...props} notes={notes} />;
  };
}
