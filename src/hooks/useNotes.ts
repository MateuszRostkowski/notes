import { useContext } from 'react';
import { NotesContext } from '../contexts/NotesProvider';

export const useNotes = () => useContext(NotesContext);
