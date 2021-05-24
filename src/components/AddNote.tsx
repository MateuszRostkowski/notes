import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Modal } from './Modal';
import { useNotes } from '../hooks/useNotes';
import { renderSuccesToast, renderErrorToast } from '../helpers/renderToast';

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
        renderSuccesToast('Note added successfuly');
        toggleMode();
      });
    } catch (e) {
      renderErrorToast(e.message);
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
      if (e.keyCode === 27) {
        toggleMode()
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
