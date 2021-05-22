import { FC, useState, useRef, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { ListNoteItem } from '../helpers/interfaces';
import AddNote from './AddNote';
import { CSSTransition } from 'react-transition-group';
import { useNotes } from '../hooks/useNotes';
import { NotesParams } from '../screens/Routes';

const SideBarNotesList: FC = () => {
  const { notes } = useNotes();
  const { noteId } = useParams<NotesParams>();

  return (
    <div className="links-container">
      {notes.map((item: ListNoteItem, index: number) => {
        return (
          <Link
            key={index}
            to={`/note/${item.name}`}
            className={noteId === item.name ? 'active-item' : ''}>
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

const SideBar: FC = () => {
  const [addMode, setAddMode] = useState(false);
  const [showNotesList, setShowNotesList] = useState(false);
  const sideBarRef = useRef<HTMLDivElement | null>(null);

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
        className={classNames('sidebar-toggle', {
          'sidebar-toggle--opened': showNotesList,
        })}
        onClick={() => setShowNotesList(!showNotesList)}>
        <span className="burger-line burger-line-1"></span>
        <span className="burger-line burger-line-1"></span>
        <span className="burger-line burger-line-1"></span>
      </div>
      <CSSTransition
        in={showNotesList}
        timeout={200}
        classNames="sidebar-wrapper">
        <div
          className="sidebar-wrapper"
          ref={ref => (sideBarRef.current = ref)}>
          <div className="sidebar-container">
            <h1>Notes app</h1>
            <a href="/" onClick={handleAddNoteClick}>
              Add note
            </a>
            <SideBarNotesList />
          </div>
        </div>
      </CSSTransition>
      {addMode && <AddNote toggleMode={toggleMode} />}
    </>
  );
};

export default SideBar;
