import React, { useEffect, useState } from 'react';
import NoteContainer from './components/NoteContainer';
import SideBar from './components/SideBar';

import { useParams, useHistory } from 'react-router-dom';
import getNotesList from './helpers/getNotesList';
import Error from './components/Error';
import { ListNoteItem } from './helpers/interfaces';
import Empty from './components/Empty';

function Home() {
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const { noteId } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    document.title = noteId || 'notes';
    const list = getNotesList();

    if (!list || list.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      if (!noteId && list.length > 0) {
        push(`/${list[0].name}`);
      }

      if (list.some((item: ListNoteItem) => item.name === noteId)) {
        setIsError(false);
      } else {
        setIsError(true);
      }
    }
  }, [noteId, push]);

  return (
    <div className="home-container">
      <SideBar />
      {!isError && !isEmpty && <NoteContainer key={noteId} noteId={noteId} />}
      {!isError && isEmpty && <Empty />}
      {isError && !isEmpty && <Error />}
    </div>
  );
}

export default Home;
