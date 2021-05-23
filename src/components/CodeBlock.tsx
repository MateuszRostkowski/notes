import { FC } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/esm/styles/prism/base16-ateliersulphurpool.light';

interface Props {
  value?: string;
  language: string;
}

const CodeBlock: FC<Props> = ({ language, children, ...props }) => {
  const match = /language-(\w+)/.exec(language || '');
  return (
    <SyntaxHighlighter
      style={style}
      language={match?.[1]}
      PreTag="div"
      children={String(children).replace(/\n$/, '')}
      {...props}
    />
  );
};

export default CodeBlock;
