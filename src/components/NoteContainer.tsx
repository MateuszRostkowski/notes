import React, { FC, useState, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown/with-html';

import CodeBlock from './CodeBlock';
import NoteSettings from './NoteSettings';
import ToggleModeButton from './ToggleModeButton';

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

const markdownChecked = '- [x]';
const markdownUnchecked = '- [ ]';

const WrapCheckBox = (props: any) => {
  const { markdown, setMarkdown, sourcePosition, checked, children } = props;
  const flipCheckBox = () => {
    try {
      const lineIndex = sourcePosition.start.line - 1;
      const lines = markdown.split('\n');
      const find = checked ? markdownChecked : markdownUnchecked;
      const replace = checked ? markdownUnchecked : markdownChecked;
      console.log({ lineIndex, lines, find, replace });
      lines[lineIndex] = lines[lineIndex].replace(find, replace);
      setMarkdown(lines.join('\n'));
    } catch (error) {
      console.warn('Error while filpin checkbox: ', error);
    }
  };
  return (
    <li>
      <input type="checkbox" checked={checked} onClick={flipCheckBox} />
      {children}
    </li>
  );
};

const modes = ['edit', 'preview', 'both'] as const;
export type modes = typeof modes[number];

const NoteContainer: FC<Props> = ({ noteId }) => {
  const locaStorageTypingMode = localStorage.getItem(TYPING_MODE_KEY);
  const initialType =
    locaStorageTypingMode === 'preview'
      ? 'preview'
      : locaStorageTypingMode === 'edit'
      ? 'edit'
      : 'both';

  const [typingMode, setTypingMode] = useState<modes>(initialType);
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

  const renderers = {
    listItem: (props: any): any => {
      const { children } = props;
      if (typeof props.checked === 'boolean') {
        const { checked, sourcePosition } = props;
        return (
          <WrapCheckBox
            markdown={value}
            setMarkdown={setValue}
            checked={checked}
            sourcePosition={sourcePosition}>
            {children}
          </WrapCheckBox>
        );
      }
      return <li>{children}</li>;
    },
    code: CodeBlock,
  };

  return (
    <div className="note">
      <NoteSettings />
      <div
        className={`note-wrapper${
          typingMode === 'both' ? ' note-wrapper--both' : ''
        }`}>
        <div className="mode-buttons-container">
          {modes.map(mode => (
            <ToggleModeButton
              mode={mode}
              typingMode={typingMode}
              onToggleChange={setTypingMode}
            />
          ))}
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
                renderers={renderers}
                source={value}
                rawSourcePos
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
