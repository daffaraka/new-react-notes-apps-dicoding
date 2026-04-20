import React, { createContext, useContext, useState } from 'react';
import { getInitialData } from '../utils';

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(getInitialData());
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedNote, setSelectedNote] = useState(null)

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
    const note = [...activeNotes,...archivedNotes].find((n) => n.id === id);
    setSelectedNote(note);

  }

  const onCloseDetail = () => setSelectedNote(null)


  function onAdd({ title, body }) {
    setNotes((prev) => [
      ...prev,
      { id: +new Date(), title, body, createdAt: new Date().toISOString(), archived: false },
    ]);
  }

  function onDelete(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function onArchive(id) {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, archived: !n.archived } : n)));
  }

  return (
    <NotesContext.Provider value={{ activeNotes, archivedNotes, searchKeyword, setSearchKeyword, onAdd, onDelete, onArchive, onOpenDetail, onCloseDetail, selectedNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => useContext(NotesContext);
