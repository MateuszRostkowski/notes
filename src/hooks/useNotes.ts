import { useContext } from 'react';
import { NotesContext, NotesContextType } from '../contexts/NotesProvider';

export const useNotes = (): NotesContextType => useContext(NotesContext);
