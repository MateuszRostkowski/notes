import React, { FC, useState, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown/with-html';
import CodeBlock from './CodeBlock';
import NoteSettings from './NoteSettings';

export const TYPING_MODE_KEY = 'typing_mode';

interface Props {
  noteId: string;
}

const generateKeySelection = (cm: any, prefix: string) => {
  const selection = cm.getSelection();

  if (selection.length > 0) {
    const match =
      `${selection.slice(0, 2)}${selection.slice(-2)}` === prefix + prefix;
    if (match) {
      cm.replaceSelection(`${selection.slice(2).slice(0, -2)}`);
    } else {
      cm.replaceSelection(`${prefix}${selection}${prefix}`);
    }
  }
};

const options = {
  mode: 'markdown',
  autofocus: true,
  extraKeys: {
    'Cmd-B': (cm: any) => generateKeySelection(cm, '**'),
    'Cmd-I': (cm: any) => generateKeySelection(cm, '*'),
  },
};

const NoteContainer: FC<Props> = ({ noteId }) => {
  const locaStorageTypingMode = localStorage.getItem(TYPING_MODE_KEY);
  const initialType =
    locaStorageTypingMode === 'preview'
      ? 'preview'
      : locaStorageTypingMode === 'edit'
      ? 'edit'
      : 'both';

  const [typingMode, setTypingMode] = useState<'preview' | 'edit' | 'both'>(
    initialType,
  );
  const [value, setValue] = useState('');
  const [noteName, setNoteName] = useState('');

  useEffect(() => {
    localStorage.setItem(TYPING_MODE_KEY, typingMode);
  }, [typingMode]);

  useEffect(() => {
    const rawNote = localStorage.getItem(noteId);
    if (rawNote) {
      setNoteName(JSON.parse(rawNote).name);
      setValue(JSON.parse(rawNote).value);
    }
  }, [noteId]);

  useEffect(() => {
    if (noteId && value) {
      localStorage.setItem(
        noteId,
        JSON.stringify({
          name: noteName,
          value,
        }),
      );
    }
  }, [value, noteId, noteName]);

  return (
    <div className="note">
      <NoteSettings />
      <div
        className={`note-wrapper${
          typingMode === 'both' ? ' note-wrapper--both' : ''
        }`}>
        <div className="mode-buttons-container">
          <button
            className={`mode-button${
              typingMode === 'edit' ? ' mode-button-active' : ''
            }`}
            onClick={() => setTypingMode('edit')}>
            Edit
          </button>
          <button
            className={`mode-button${
              typingMode === 'preview' ? ' mode-button-active' : ''
            }`}
            onClick={() => setTypingMode('preview')}>
            Preview
          </button>
          <button
            className={`mode-button${
              typingMode === 'both' ? ' mode-button-active' : ''
            }`}
            onClick={() => setTypingMode('both')}>
            Both
          </button>
        </div>
        <h1 className="note-title">{noteName}</h1>
        <div className="note-container">
          {(typingMode === 'edit' || typingMode === 'both') && (
            <div className="code-mirror-container">
              <CodeMirror
                value={value}
                options={options}
                onBeforeChange={(editor, data, value) => {
                  console.log('xd', editor);
                  setValue(value);
                }}
              />
            </div>
          )}
          {(typingMode === 'preview' || typingMode === 'both') && (
            <div className="react-markdown-container markdown-body">
              <ReactMarkdown
                renderers={{ code: CodeBlock }}
                source={value}
                escapeHtml={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteContainer;
