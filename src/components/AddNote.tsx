import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Modal } from './Modal';
import { useNotes } from '../hooks/useNotes';
import { toast } from 'react-toastify';

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

  const handleAddNote = useCallback(() => {
    try {
      addNote(name, () => {
        toast.success('Note added successfuly', {
          position: toast.POSITION.TOP_RIGHT,
        });
        toggleMode();
      });
    } catch (e) {
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [addNote, name, toggleMode]);

  const handleClose = useCallback(
    e => {
      e.preventDefault();
      toggleMode();
    },
    [toggleMode],
  );

  const handleInput = useCallback(e => {
    setName(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    e => {
      if (e.keyCode === 13) {
        handleAddNote();
      }
    },
    [handleAddNote],
  );

  return (
    <Modal>
      <div className="add-note-wrappper">
        <div className="add-note-container">
          <a href="/" onClick={handleClose}>
            Close
          </a>
          <input
            ref={ref => (inputRef.current = ref)}
            value={name}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
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
