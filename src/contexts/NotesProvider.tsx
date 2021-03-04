import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { TYPING_MODE_KEY } from '../components/NoteContainer';
import getNotesList, { NOTE_LIST_KEY } from '../helpers/getNotesList';
import { ListNoteItem } from '../helpers/interfaces';
import uuidv4 from '../helpers/uuid';

interface SingeNote {
  id: string;
  name: string;
  value: string;
}

interface NotesContext {
  addNote: (name: string, callback: () => void) => void;
  notes: ListNoteItem[];
  currentNote: SingeNote | null;
}

export const NotesContext = createContext<NotesContext>({
  addNote: () => {},
  notes: [],
  currentNote: null,
});

interface Props {
  children?: ReactNode;
}

export function NotesProvider(props: Props) {
  const [notes, setNotes] = useState<ListNoteItem[]>([]);
  const [currentNote, setCurrentNote] = useState<SingeNote | null>(null);
  const { push } = useHistory();

  const readNotes = useCallback(() => {
    const newNotes = getNotesList();
    setNotes(newNotes);
  }, []);

  useEffect(() => {
    readNotes();
    setCurrentNote(null);
  }, [readNotes]);

  useEffect(() => {
    localStorage.setItem(NOTE_LIST_KEY, JSON.stringify(notes));
  }, [notes]);

  const checkIfNameIsTaken = useCallback(
    (name: string) => {
      const isNameTaken = notes.some(note => note.name === name);
      return isNameTaken;
    },
    [notes],
  );

  const addNote = useCallback(
    (name, callback) => {
      let errorMessage = null;
      if (!name) {
        errorMessage = 'Name can not be empty';
      } else if (
        name === NOTE_LIST_KEY ||
        name === TYPING_MODE_KEY ||
        checkIfNameIsTaken(name)
      ) {
        errorMessage = 'This name is not allowed';
      } else if (checkIfNameIsTaken(name)) {
        errorMessage = 'This name is already taken';
      }

      if (errorMessage) {
        throw new Error(errorMessage);
      }

      const newNote: ListNoteItem = {
        name,
        id: uuidv4(),
      };
      const newList = [newNote, ...notes];
      setNotes(newList);
      localStorage.setItem(
        name,
        JSON.stringify({
          name,
          value: '',
        }),
      );
      push(`/${name}`);
      callback();
    },
    [notes, checkIfNameIsTaken, push],
  );

  const removeCurrentNote = () => {};

  const editCurrentNote = () => {};

  return (
    <NotesContext.Provider
      value={{
        addNote,
        notes,
        currentNote,
      }}>
      {props.children}
    </NotesContext.Provider>
  );
}
