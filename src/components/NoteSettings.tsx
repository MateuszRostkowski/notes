import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Cog from '../Cog_font_awesome.svg';
import getNotesList, { NOTE_LIST_KEY } from '../helpers/getNotesList';
import { ListNoteItem } from '../helpers/interfaces';
import { Modal } from './Modal';
import { TYPING_MODE_KEY } from './NoteContainer';

const NoteSettings: FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { noteId } = useParams();
  const { push } = useHistory();
  const [name, setName] = useState(noteId);

  useEffect(() => {
    setName(noteId);
  }, [noteId]);

  // const handleDeleteNote = () => alert('Deleting note is not supported');

  const toggleMode = () => {
    setShowSettings(state => !state);
  };

  const handleEditNote = () => {
    if (!name) {
      toggleMode();
      return;
    }

    if (name === NOTE_LIST_KEY || name === TYPING_MODE_KEY) {
      alert('this name is not allowed');
      return;
    }
    const list = getNotesList();

    const newList = list.map((item: ListNoteItem) => {
      if (item.name === noteId) {
        return { name };
      }
      return item;
    });
    const rawNote = localStorage.getItem(noteId);

    console.log('newList', newList, rawNote);

    if (rawNote) {
      const oldNote = JSON.parse(rawNote);
      const value = JSON.stringify({
        name,
        value: oldNote?.value,
      });

      localStorage.setItem(name, value);
      localStorage.setItem(NOTE_LIST_KEY, JSON.stringify(newList));
      toggleMode();
    }
    push(`/${name}`);
    localStorage.removeItem(noteId);
  };
  const handleDeleteNote = () => {
    const list = getNotesList();

    const newList = list.filter((item: ListNoteItem) => item.name !== noteId);

    localStorage.setItem(NOTE_LIST_KEY, JSON.stringify(newList));
    push(`/${newList[0]?.name ?? ''}`);
    localStorage.removeItem(noteId);
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
