import { FC, useCallback } from 'react';
import { ModesType } from './NoteContainer';

interface Props {
  typingMode: ModesType;
  mode: ModesType;
  onToggleChange: (mode: ModesType) => void;
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
