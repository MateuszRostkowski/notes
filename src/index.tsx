import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/gh-markdown.css';
import Routes from './screens/Routes';
import * as serviceWorker from './serviceWorker';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/mode/javascript/javascript.js';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
