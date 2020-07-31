import React, { useState } from "react";
import { Link } from 'react-router-dom'

function SideBar() {
  const [addMode, setAddMode] = useState(false)
  return (
    <>
      <div className="sidebar-container">
        <a href="/" onClick={(e) => {
          e.preventDefault()
          setAddMode(!addMode)
          console.log()
        }}>Dodaj listę</a>
        <h1>Notes app</h1>
        <div className="links-container">
          <Link to="/first-note">First note</Link>
          <Link to="/second-note">Second note</Link>
        </div>
      </div>
      {addMode && (
        <div className="add-note-wrappper">
          <div className="add-note-container">
            <a href="/" onClick={(e) => {
              e.preventDefault()
              setAddMode(!addMode)
            }}>Close</a>
            <p>Hahaha</p>
          </div>
          <div onClick={() => setAddMode(!addMode)} className="add-note-background"></div>
        </div>
      )}
    </>
  );
}

export default SideBar;
