import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './components/Search';
import AddNoteForm from './components/AddNoteForm';
import NoteCart from './components/NoteCart';
import { getNotes, addNote, deleteNote, updateNote } from './CRUD/notesService';

function App() {
  const colors = ['#FFFFFF', '#F39F76', '#FFF8B8'];
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedNotes = getNotes();
    setNotes(storedNotes);
  }, []);

  const handleAddNote = (title, content) => {
    const updatedNotes = addNote(title, content);
    setNotes(updatedNotes);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = deleteNote(id);
    setNotes(updatedNotes);
  };

  const handleUpdateNote = (id, newTitle, newContent) => {
    const updatedNotes = updateNote(id, newTitle, newContent);
    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="App">
      <header className="App-header">
        <h3>My Note Keeper</h3>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </header>
      <AddNoteForm addNote={handleAddNote} />
      <div className="noteContainer">
        {filteredNotes.map((note, index) => (
          <NoteCart
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            date={note.date}
            backgroundColor={colors[index % colors.length]}
            onDelete={handleDeleteNote}
            onUpdate={handleUpdateNote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
