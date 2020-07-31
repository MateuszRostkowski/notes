import React, { FC, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import getNotesList, { NOTE_LIST_KEY } from "../helpers/getNotesList";
import { ListNoteItem } from "../helpers/interfaces";

interface AddNoteProps {
  toggleMode: () => void;
}

const AddNote: FC<AddNoteProps> = ({ toggleMode }) => {
  const { push } = useHistory()
  const [name, setName] = useState("")

  const handleAddNote = () => {
    if(!name) {
      toggleMode()
      return 
    }
    const list = getNotesList()
    const newNote: ListNoteItem = {
      name
    }
    const newList = [newNote, ...list]
    localStorage.setItem(name, JSON.stringify({
      name,
      value: ""
    }))
    localStorage.setItem(NOTE_LIST_KEY, JSON.stringify(newList))
    push(`/${name}`)
    toggleMode()
  }

  return (
    <div className="add-note-wrappper">
      <div className="add-note-container">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            toggleMode();
          }}
        >
          Close
        </a>
        <input value={name} onChange={(e) => setName(e.target.value)}/>
        <button onClick={handleAddNote}>Add new note</button>
      </div>
      <div onClick={toggleMode} className="add-note-background"></div>
    </div>
  );
};

function SideBar() {
  const [addMode, setAddMode] = useState(false);
  const [notesList, setNotesList] = useState([])
  const [showNotesList, setShowNotesList] = useState(false);

  useEffect(() => {
    const list = getNotesList()
    setNotesList(list)
  }, [addMode])

  
  const toggleMode = () => setAddMode(!addMode);
  return (
    <>
      <div className="sidebar-toggle" onClick={() => setShowNotesList(!showNotesList)}>
        <span className="burger-line burger-line-1"></span>
        <span className="burger-line burger-line-1"></span>
        <span className="burger-line burger-line-1"></span>
      </div>
      <div className={`sidebar-container${showNotesList ? " sidebar-container--hidden" : ""}`}>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            toggleMode();
          }}
        >
          Dodaj listę
        </a>
        <h1>Notes app</h1>
        <div className="links-container">
          {notesList.map((item: ListNoteItem, index: number) => {
            return (
              <Link key={index} to={`/${item.name}`}>{item.name}</Link>
            )
          })}
        </div>
      </div>
      {addMode && <AddNote toggleMode={toggleMode} />}
    </>
  );
}

export default SideBar;
