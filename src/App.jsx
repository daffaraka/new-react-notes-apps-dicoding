import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NotesProvider } from './context/NotesContext';
import Navigation from './components/Navigation';
import Homepage from './Homepage';
import Archive from './Archive';
import NoteDetail from './NoteDetail';
import NotFound from './NotFound';

class App extends React.Component {
  render() {
    return (
      <NotesProvider>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </NotesProvider>
    );
  }
}

export default App;
