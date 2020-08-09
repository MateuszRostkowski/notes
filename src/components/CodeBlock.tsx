import React, { FC } from "react";

import Highlight from "react-highlight.js";

interface Props {
  value: string;
  language: string;
}

const CodeBlock: FC<Props> = ({ value, language }) => {
  return <Highlight language={language}>{value}</Highlight>;
};

export default CodeBlock;
