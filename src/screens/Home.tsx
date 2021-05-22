import { FC, useEffect, useState } from 'react';
import NoteContainer from '../components/NoteContainer';
import SideBar from '../components/SideBar';

import { useParams, useHistory } from 'react-router-dom';
import Error from '../components/Error';
import { ListNoteItem } from '../helpers/interfaces';
import Empty from '../components/Empty';
import { useNotes } from '../hooks/useNotes';
import { NotesParams } from './Routes';

const Home: FC = () => {
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const { noteId } = useParams<NotesParams>();
  const { notes } = useNotes();
  const { push } = useHistory();

  useEffect(() => {
    document.title = noteId || 'notes';

    if (!notes || notes.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      if (!noteId && notes.length > 0) {
        push(`/note/${notes[0].name}`);
      }

      if (notes.some((item: ListNoteItem) => item.name === noteId)) {
        setIsError(false);
      } else {
        setIsError(true);
      }
    }
  }, [noteId, notes, push]);

  return (
    <div className="home-container">
      <SideBar />
      {!isError && !isEmpty && <NoteContainer key={noteId} />}
      {!isError && isEmpty && <Empty />}
      {isError && !isEmpty && <Error />}
    </div>
  );
};

export default Home;
