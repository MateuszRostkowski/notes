import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getNotesList from "../helpers/getNotesList";
import { ListNoteItem } from "../helpers/interfaces";
import AddNote from "./AddNote";

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
          Dodaj notatkę
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
