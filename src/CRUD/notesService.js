export const getNotes = () => {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  return notes;
};

export const addNote = (title, content) => {
  const notes = getNotes();
  const newNote = { id: Date.now(), title, content, date: new Date().toLocaleDateString() };
  const updatedNotes = [...notes, newNote];
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
  return updatedNotes;
};

export const deleteNote = (id) => {
  const notes = getNotes();
  const updatedNotes = notes.filter(note => note.id !== id);
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
  return updatedNotes;
};

export const updateNote = (id, newTitle, newContent) => {
  const notes = getNotes();
  const updatedNotes = notes.map(note => 
    note.id === id ? { ...note, title: newTitle, content: newContent } : note
  );
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
  return updatedNotes;
};