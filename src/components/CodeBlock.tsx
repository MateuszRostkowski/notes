import { FC } from 'react';

import Highlight from 'react-highlight.js';

interface Props {
  value?: string;
  language: string;
}

const CodeBlock: FC<Props> = ({ value, language, children }) => {
  return <Highlight language={language}>{value ? value : children}</Highlight>;
};

export default CodeBlock;
