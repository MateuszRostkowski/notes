import React, { createContext, ReactNode, useEffect, useState } from 'react';
import uuidv4 from '../helpers/uuid';

interface SingeNote {
  id: string;
  name: string;
  value: string;
}

interface NoteListItem {
  name: string;
  id: string;
}

interface NotesContext {
  notes: NoteListItem[];
  currentNote: SingeNote | null;
}

export const NotesContext = createContext<NotesContext>({
  notes: [],
  currentNote: null,
});

interface Props {
  children?: ReactNode;
}

export function NotesProvider(props: Props) {
  const [notes, setNotes] = useState<NoteListItem[]>([]);
  const [currentNote, setCurrentNote] = useState<SingeNote | null>(null);

  useEffect(() => {
    console.log('dupaaaa');
    setNotes([]);
    setCurrentNote(null);
  }, []);

  const addNote = (noteName = () => {});

  const removeCurrentNote = () => {};

  const editCurrentNote = () => {};

  return (
    <NotesContext.Provider
      value={{
        notes,
        currentNote,
      }}>
      {props.children}
    </NotesContext.Provider>
  );
}
