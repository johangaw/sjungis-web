import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import { List } from './components/List';
import { ShowSong } from './components/ShowSong';
import { NewSong } from './components/NewSong';
import { EditSong } from './components/EditSong';

const App: React.FC = () => {
  return (
    <Router>
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <Link to="/">Dryckesvisor.se</Link>
          <Link to="/ny">New</Link>
        </nav>
      </header>
      <main className="container pt-3 ">
        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/ny" component={NewSong} />
          <Route exact path="/updatera/:songId" component={EditSong} />
          <Route exact path="/:songId" component={ShowSong} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
