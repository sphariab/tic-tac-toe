import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Start from './components/Start';
import Game from './components/Game';
import Finish from './components/Finish';

function App() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Switch>
            <Route exact path="/" component={Start} />
            <Route exact path="/game" component={Game} />
            <Route exact path="/finish" component={Finish} />
          </Switch>
        </div>
      </Router>
    );
  }

export default App;
