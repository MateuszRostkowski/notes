import React, { FC, useCallback } from 'react';
import { modes } from './NoteContainer';

export const TYPING_MODE_KEY = 'typing_mode';

interface Props {
  typingMode: modes;
  mode: modes;
  onToggleChange: (mode: modes) => void;
}

const ToggleModeButton: FC<Props> = ({ typingMode, mode, onToggleChange }) => {
  const onItemPress = useCallback(() => onToggleChange(mode), [
    onToggleChange,
    mode,
  ]);
  return (
    <button
      className={`mode-button${
        typingMode === mode ? ' mode-button-active' : ''
      }`}
      onClick={onItemPress}>
      {mode}
    </button>
  );
};

export default ToggleModeButton;
