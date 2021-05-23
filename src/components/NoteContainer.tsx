import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import { FC, useMemo, useState } from 'react';

import CodeBlock from './CodeBlock';
import NoteSettings from './NoteSettings';
import ToggleModeButton from './ToggleModeButton';
import { useNote } from '../hooks/useNote';

interface CurrentSelection {
  editor?: CodeMirror.Editor;
  data: any;
}

const getSelectionFromRange = (range: any) => {
  const { head, anchor } = range || {};

  if (head.line <= anchor.line && head.ch >= anchor.ch) {
    return {
      startingCursor: anchor,
      endingCursor: head,
    };
  }

  return {
    startingCursor: head,
    endingCursor: anchor,
  };
};

const generateKeySelection = (
  cm: CodeMirror.Editor,
  prefix: string,
  currentSelection: CurrentSelection,
) => {
  const selection = cm.getSelection();
  const { startingCursor, endingCursor } = getSelectionFromRange(
    currentSelection.data.ranges[0],
  );
  const selectionLength = selection.length;
  const prefixLength = prefix.length;

  if (selectionLength > 0) {
    const match =
      `${selection.slice(0, prefixLength)}${selection.slice(-prefixLength)}` ===
      prefix + prefix;
    if (match) {
      const newEndingCursor = {
        ...endingCursor,
        ch: endingCursor.ch - prefixLength * 2,
      };
      cm.replaceSelection(
        `${selection.slice(prefixLength).slice(0, -prefixLength)}`,
      );
      cm.setSelection(startingCursor, newEndingCursor);
    } else {
      const newEndingCursor = {
        ...endingCursor,
        ch: endingCursor.ch + prefixLength * 2,
      };
      cm.replaceSelection(`${prefix}${selection}${prefix}`);
      cm.setSelection(startingCursor, newEndingCursor);
    }
  }
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

      lines[lineIndex] = lines[lineIndex].replace(find, replace);
      setMarkdown(lines.join('\n'));
    } catch (error) {
      console.warn('Error while filpin checkbox: ', error);
    }
  };
  return (
    <li>
      <input type="checkbox" checked={checked} onChange={flipCheckBox} />
      {children}
    </li>
  );
};

const modes = ['edit', 'preview', 'both'] as const;
export type ModesType = typeof modes[number];

const NoteContainer: FC = () => {
  const {
    note,
    setNote,
    noteName,
    typingMode,
    setTypingMode,
    handleCodeMirrorChange,
  } = useNote();

  const [currentSelection, setCurrentSelection] = useState<CurrentSelection>({
    editor: undefined,
    data: undefined,
  });

  const options: CodeMirror.EditorConfiguration = useMemo(
    () => ({
      mode: 'markdown',
      autofocus: true,
      extraKeys: {
        'Cmd-B': (cm: CodeMirror.Editor) =>
          generateKeySelection(cm, '**', currentSelection),
        'Cmd-I': (cm: CodeMirror.Editor) =>
          generateKeySelection(cm, '_', currentSelection),
      },
    }),
    [currentSelection],
  );

  const components = {
    li: (props: any): any => {
      const { children } = props;
      if (typeof props.checked === 'boolean') {
        const { checked, sourcePosition } = props;
        return (
          <WrapCheckBox
            markdown={note}
            setMarkdown={setNote}
            checked={checked}
            sourcePosition={sourcePosition}>
            {children}
          </WrapCheckBox>
        );
      }
      return <li>{children}</li>;
    },
    code({ children, className, ...props }: any) {
      console.log(props);
      return (
        <CodeBlock language={className || ''} children={children} {...props} />
      );
    },
  };

  const isPreviewMode = typingMode === 'preview';
  const isBothMode = typingMode === 'both';
  const isEditMode = typingMode === 'edit';

  return (
    <div className="note">
      <NoteSettings />
      <div
        className={classNames('note-wrapper', {
          'note-wrapper--both': isBothMode,
        })}>
        <div className="mode-buttons-container">
          {modes.map(mode => (
            <ToggleModeButton
              key={mode}
              mode={mode}
              typingMode={typingMode}
              onToggleChange={setTypingMode}
            />
          ))}
        </div>
        <h1 className="note-title">{noteName}</h1>
        <div className="note-container">
          {(isEditMode || isBothMode) && (
            <div className="code-mirror-container">
              <CodeMirror
                value={note}
                options={options}
                onBeforeChange={handleCodeMirrorChange}
                onSelection={(editor, data) =>
                  setCurrentSelection({ editor, data })
                }
              />
            </div>
          )}
          {(isPreviewMode || isBothMode) && (
            <div className="react-markdown-container markdown-body">
              <ReactMarkdown
                children={note}
                components={components}
                rawSourcePos
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteContainer;
