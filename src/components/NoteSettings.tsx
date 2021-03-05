import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cog from '../Cog_font_awesome.svg';
import { useNotes } from '../hooks/useNotes';
import { Modal } from './Modal';

const NoteSettings: FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { noteId } = useParams();
  const [name, setName] = useState(noteId);
  const { editNoteName, removeNote } = useNotes();

  useEffect(() => {
    setName(noteId);
  }, [noteId]);

  const toggleMode = () => {
    setShowSettings(state => !state);
  };

  const handleEditNote = () => {
    try {
      editNoteName(noteId, name, toggleMode);
    } catch (e) {
      alert(e);
    }
  };
  const handleDeleteNote = () => {
    removeNote(noteId);
  };

  return (
    <>
      <div className="note-settings" onClick={toggleMode}>
        <img src={Cog} alt="React Logo" className="cog-icon" />
      </div>
      {showSettings && (
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
              <input value={name} onChange={e => setName(e.target.value)} />
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
