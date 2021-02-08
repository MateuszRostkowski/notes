import React, { FC, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import getNotesList, { NOTE_LIST_KEY } from '../helpers/getNotesList';
import { ListNoteItem } from '../helpers/interfaces';
import { TYPING_MODE_KEY } from './NoteContainer';
import { Modal } from './Modal';

interface AddNoteProps {
  toggleMode: () => void;
}

const AddNote: FC<AddNoteProps> = ({ toggleMode }) => {
  const { push } = useHistory();
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement | null>();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAddNote = () => {
    if (!name) {
      toggleMode();
      return;
    }

    if (name === NOTE_LIST_KEY || name === TYPING_MODE_KEY) {
      alert('this name is not allowed');
      return;
    }
    const list = getNotesList();
    const newNote: ListNoteItem = {
      name,
    };
    const newList = [newNote, ...list];
    localStorage.setItem(
      name,
      JSON.stringify({
        name,
        value: '',
      }),
    );
    localStorage.setItem(NOTE_LIST_KEY, JSON.stringify(newList));
    push(`/${name}`);
    toggleMode();
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
