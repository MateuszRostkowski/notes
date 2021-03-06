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
  editNoteName: (noteId: string, name: string, callback: () => void) => void;
  removeNote: (name: string) => void;
  notes: ListNoteItem[];
  currentNote: SingeNote | null;
}

export const NotesContext = createContext<NotesContext>({
  addNote: () => {},
  editNoteName: () => {},
  removeNote: () => {},
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

  const checkIfNameIsAllowed = useCallback(
    (name: string) => {
      const isNameTaken = notes.some(
        note => note.name.toLowerCase() === name.toLowerCase(),
      );

      let errorMessage = null;
      if (!name) {
        errorMessage = 'Name can not be empty';
      } else if (name === NOTE_LIST_KEY || name === TYPING_MODE_KEY) {
        errorMessage = 'This name is not allowed';
      } else if (isNameTaken) {
        errorMessage = 'This name is already taken';
      } else if (name.match(/[#/]/)) {
        errorMessage = "You can't use # or / characters";
      }
      if (errorMessage) {
        throw new Error(errorMessage);
      }

      return;
    },
    [notes],
  );

  const addNote = useCallback(
    (name, callback) => {
      checkIfNameIsAllowed(name);

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
      push(`/note/${name}`);
      callback();
    },
    [notes, checkIfNameIsAllowed, push],
  );

  const removeNote = (noteId: string) => {
    const newNotes = notes.filter((item: ListNoteItem) => item.name !== noteId);
    setNotes(newNotes);

    push(`/note/${newNotes[0]?.name ?? ''}`);
    localStorage.removeItem(noteId);
  };

  const editNoteName = (noteId: string, name: string, callback: () => void) => {
    checkIfNameIsAllowed(name);
    if (name === NOTE_LIST_KEY || name === TYPING_MODE_KEY) {
      alert('this name is not allowed');
      return;
    }

    const newNotes = notes.map(item => {
      if (item.name === noteId) {
        return { ...item, name };
      }
      return item;
    });
    const rawNote = localStorage.getItem(noteId);

    if (rawNote) {
      const oldNote = JSON.parse(rawNote);
      const value = JSON.stringify({
        name,
        value: oldNote?.value,
      });

      localStorage.setItem(name, value);
      setNotes(newNotes);
      localStorage.setItem(NOTE_LIST_KEY, JSON.stringify(newNotes));
      callback();
    }
    push(`/note/${name}`);
    localStorage.removeItem(noteId);
  };

  return (
    <NotesContext.Provider
      value={{
        addNote,
        editNoteName,
        removeNote,
        notes,
        currentNote,
      }}>
      {props.children}
    </NotesContext.Provider>
  );
}
