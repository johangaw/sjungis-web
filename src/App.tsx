import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import { List } from './components/List';
import { Song } from './components/Song';

const App: React.FC = () => {
  return (
    <Router>
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <Link to="/">Dryckesvisor.se</Link>
        </nav>
      </header>
      <main className="container pt-3 ">
        <Route exact path="/" component={List} />
        <Route exact path="/:songId" component={Song} />
      </main>
    </Router>
  );
}

export default App;
