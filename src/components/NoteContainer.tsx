import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';

import CodeBlock from './CodeBlock';
import NoteSettings from './NoteSettings';
import ToggleModeButton from './ToggleModeButton';
import { useNote } from '../hooks/useNote';

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

const NoteContainer = () => {
  const {
    note,
    setNote,
    noteName,
    typingMode,
    setTypingMode,
    handleCodeMirrorChange,
  } = useNote();

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
    code({ children, className }: any) {
      return <CodeBlock
        language={className || ''}
        children={children}
      />
    }
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
              />
            </div>
          )}
          {(isPreviewMode || isBothMode) && (
            <div className="react-markdown-container markdown-body">
              <ReactMarkdown
                children={note}
                components={components}
                rawSourcePos
                // escapeHtml={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteContainer;
