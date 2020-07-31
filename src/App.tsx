import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/:noteId" children={<Home />} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
