import React, { useEffect, useState, useLayoutEffect } from "react";
import NoteContainer from "./components/NoteContainer";
import SideBar from "./components/SideBar";

import { useParams, useHistory } from "react-router-dom";
import getNotesList from "./helpers/getNotesList";
import Error from "./components/Error";
import { ListNoteItem } from "./helpers/interfaces";

function Home() {
  const [isError, setIsError] = useState(false)
  const { noteId } = useParams()
  const { push } = useHistory()

  useEffect(() => {
    document.title = noteId
    const list = getNotesList()
    
    if(!noteId && list.length > 0) {
      push(`/${list[0].name}`)
    }

    if(list.some((item: ListNoteItem) => item.name === noteId)) {
      setIsError(false)
    } else {
      setIsError(true)
    }
  }, [noteId, push])

  return (
    <div className="home-container">
      <SideBar />
      {!isError ? <NoteContainer noteId={noteId} /> : <Error />}
    </div>
  );
}

export default Home;
