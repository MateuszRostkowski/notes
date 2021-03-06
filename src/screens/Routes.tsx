import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import { NotesProvider } from '../contexts/NotesProvider';

export interface NotesParams {
  noteId: string;
}

export default function Routes() {
  return (
    <Router basename="/">
      <div>
        <NotesProvider>
          <Switch>
            <Route path="/note/:noteId" children={<Home />} />
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </NotesProvider>
      </div>
    </Router>
  );
}
