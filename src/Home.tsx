import React from "react";
import NoteContainer from "./components/NoteContainer";
import SideBar from "./components/SideBar";

import { useParams } from "react-router-dom";

function Home() {
  const { noteId } = useParams()

  return (
    <div className="home-container">
      <SideBar />
      <NoteContainer noteId={noteId} />
    </div>
  );
}

export default Home;
