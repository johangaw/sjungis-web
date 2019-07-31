import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import { List } from './components/List';
import { ShowSong } from './components/ShowSong';
import { NewSong } from './components/NewSong';

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
        <Route exact path="/" component={List} />
        <Route exact path="/ny" component={NewSong} />
        <Route exact path="/låt/:songId" component={ShowSong} />
      </main>
    </Router>
  );
}

export default App;
