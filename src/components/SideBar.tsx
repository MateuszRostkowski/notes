import React, { useState, useRef, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ListNoteItem } from '../helpers/interfaces';
import AddNote from './AddNote';
import { CSSTransition } from 'react-transition-group';
import { useNotes } from '../hooks/useNotes';

const SideBarNotesList = () => {
  const { notes } = useNotes();
  const { noteId } = useParams();

  return (
    <div className="links-container">
      {notes.map((item: ListNoteItem, index: number) => {
        return (
          <Link
            key={index}
            to={`/${item.name}`}
            className={noteId === item.name ? 'active-item' : ''}>
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

function SideBar() {
  const [addMode, setAddMode] = useState(false);
  const [showNotesList, setShowNotesList] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const toggleMode = useCallback(() => {
    setAddMode(state => !state);
  }, []);

  const handleAddNoteClick = useCallback(
    e => {
      e.preventDefault();
      toggleMode();
    },
    [toggleMode],
  );

  return (
    <>
      <div
        className={`sidebar-toggle${
          showNotesList ? ' sidebar-toggle--opened' : ''
        }`}
        onClick={() => setShowNotesList(!showNotesList)}>
        <span className="burger-line burger-line-1"></span>
        <span className="burger-line burger-line-1"></span>
        <span className="burger-line burger-line-1"></span>
      </div>
      <CSSTransition
        in={showNotesList}
        timeout={200}
        classNames="sidebar-wrapper">
        <div className="sidebar-wrapper" ref={sideBarRef}>
          <div className="sidebar-container">
            <h1>Notes app</h1>
            <a href="/" onClick={handleAddNoteClick}>
              Add note
            </a>
            <div className="links-container">
              <SideBarNotesList />
            </div>
          </div>
        </div>
      </CSSTransition>
      {addMode && <AddNote toggleMode={toggleMode} />}
    </>
  );
}

export default SideBar;
