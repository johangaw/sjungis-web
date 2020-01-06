import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { EditSong } from './components/EditSong';
import { ListSongs } from './components/ListSong';
import { Navbar } from './components/Navbar';
import { NewSong } from './components/NewSong';
import { Settings } from './components/Settings';
import { ShowSong } from './components/ShowSong';

const App: React.FC = () => {
  return (
    <Router>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="container pt-3 ">
        <Switch>
          <Route exact path="/" component={ListSongs} />
          <Route exact path="/ny" component={NewSong} />
          <Route exact path="/inställningar" component={Settings} />
          <Route exact path="/updatera/:songId" component={EditSong} />
          <Route exact path="/:songId" component={ShowSong} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
