import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./Home";

export default function App() {
  return (
    <Router basename="/">
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
