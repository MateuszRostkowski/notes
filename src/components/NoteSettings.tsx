import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Cog from '../Cog_font_awesome.svg';
import { renderSuccesToast, renderErrorToast } from '../helpers/renderToast';
import { useNotes } from '../hooks/useNotes';
import { NotesParams } from '../screens/Routes';
import { Modal } from './Modal';

const NoteSettings: FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { noteId } = useParams<NotesParams>();
  const [name, setName] = useState(noteId);
  const { editNoteName, removeNote } = useNotes();

  useEffect(() => {
    setName(noteId);
  }, [noteId]);

  const toggleMode = useCallback(() => {
    setShowSettings(state => !state);
  }, []);

  const handleEditNote = useCallback(() => {
    try {
      editNoteName(noteId, name, () => {
        renderSuccesToast('Note name edited successfuly');
        toggleMode();
      });
    } catch (e) {
      renderErrorToast(e);
    }
  }, [editNoteName, name, noteId, toggleMode]);

  const handleDeleteNote = useCallback(() => {
    removeNote(noteId, () => {
      renderSuccesToast('Note deleted successfuly');
    });
  }, [noteId, removeNote]);

  const handleClose = useCallback(
    e => {
      e.preventDefault();
      toggleMode();
    },
    [toggleMode],
  );

  const handleKeyDown = useCallback(
    e => {
      if (e.keyCode === 13) {
        handleEditNote();
      }
      if (e.keyCode === 27) {
        toggleMode()
      }
    },
    [handleEditNote],
  );

  const handleInputChange = useCallback(e => setName(e.target.value), []);

  return (
    <>
      <div className="note-settings" onClick={toggleMode}>
        <img src={Cog} alt="React Logo" className="cog-icon" />
      </div>
      {showSettings && (
        <Modal>
          <div className="add-note-wrappper">
            <div className="add-note-container">
              <a href="/" onClick={handleClose}>
                Close
              </a>
              <input
                value={name}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <div className="mb">
                <button className="button" onClick={handleEditNote}>
                  Edit note name
                </button>
              </div>
              <button
                className="button button-danger"
                onClick={handleDeleteNote}>
                Delete note
              </button>
            </div>
            <div onClick={toggleMode} className="add-note-background"></div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NoteSettings;
