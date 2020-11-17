import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import getNotesList from '../helpers/getNotesList';
import { ListNoteItem } from '../helpers/interfaces';
import AddNote from './AddNote';
import { CSSTransition } from 'react-transition-group';

function SideBar() {
  const [addMode, setAddMode] = useState(false);
  const [notesList, setNotesList] = useState([]);
  const [width, setWidth] = useState<number | 'auto'>('auto');
  const [showNotesList, setShowNotesList] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const { noteId } = useParams();
  useEffect(() => {
    const list = getNotesList();
    setNotesList(list);
  }, [addMode, noteId]);

  useEffect(() => {
    setWidth(sideBarRef?.current?.clientWidth ?? 'auto');
  }, []);

  const toggleMode = () => setAddMode(!addMode);
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
          <div className="sidebar-container" style={{ width }}>
            <h1>Notes app</h1>
            <a
              href="/"
              onClick={e => {
                e.preventDefault();
                toggleMode();
              }}>
              Add note
            </a>
            <div className="links-container">
              {notesList.map((item: ListNoteItem, index: number) => {
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
          </div>
        </div>
      </CSSTransition>
      {addMode && <AddNote toggleMode={toggleMode} />}
    </>
  );
}

export default SideBar;
