import React, { FC, useEffect, useRef, useState } from 'react';
import { Modal } from './Modal';
import { useNotes } from '../hooks/useNotes';

interface AddNoteProps {
  toggleMode: () => void;
}

const AddNote: FC<AddNoteProps> = ({ toggleMode }) => {
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement | null>();
  const { addNote } = useNotes();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAddNote = () => {
    try {
      addNote(name, toggleMode);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Modal>
      <div className="add-note-wrappper">
        <div className="add-note-container">
          <a
            href="/"
            onClick={e => {
              e.preventDefault();
              toggleMode();
            }}>
            Close
          </a>
          <input
            ref={ref => (inputRef.current = ref)}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button className="button" onClick={handleAddNote}>
            Add new note
          </button>
        </div>
        <div onClick={toggleMode} className="add-note-background"></div>
      </div>
    </Modal>
  );
};

export default AddNote;
