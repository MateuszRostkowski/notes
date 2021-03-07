import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NotesParams } from '../screens/Routes';
import { modes } from '../components/NoteContainer';

export const TYPING_MODE_KEY = 'typing_mode';

export const useNote = () => {
  const [note, setNote] = useState<string>('');
  const { noteId } = useParams<NotesParams>();

  const locaStorageTypingMode = localStorage.getItem(TYPING_MODE_KEY);
  const initialType =
    locaStorageTypingMode === 'preview'
      ? 'preview'
      : locaStorageTypingMode === 'edit'
      ? 'edit'
      : 'both';

  const [typingMode, setTypingMode] = useState<modes>(initialType);
  const [noteName, setNoteName] = useState('');

  useEffect(() => {
    localStorage.setItem(TYPING_MODE_KEY, typingMode);
  }, [typingMode]);

  useEffect(() => {
    const rawNote = localStorage.getItem(noteId);
    if (rawNote) {
      setNoteName(JSON.parse(rawNote).name);
      setNote(JSON.parse(rawNote).value);
    }
  }, [noteId, setNote]);

  useEffect(() => {
    if (noteId && note) {
      localStorage.setItem(
        noteId,
        JSON.stringify({
          name: noteName,
          value: note,
        }),
      );
    }
  }, [note, noteId, noteName]);

  const handleCodeMirrorChange = useCallback(
    (editor, data, value) => {
      setNote(value);
    },
    [setNote],
  );

  return {
    note,
    setNote,
    noteName,
    typingMode,
    setTypingMode,
    handleCodeMirrorChange,
  };
};
