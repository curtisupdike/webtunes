import React from 'react';
import { Router } from '@reach/router';
import useAuthorization from './hooks/useAuthorization';
import LoginButton from './components/LoginButton/LoginButton';
import Navigation from './components/Navigation/Navigation';
import Browse from './routes/Browse/Browse';
import NotFound from './routes/NotFound/NotFound';
import {
  app,
  sidebar,
  header,
  title,
  player,
  main
} from './App.module.css';

function App() {
  const isAuthorized = useAuthorization();

  return (
    <div className={app}>
      <div className={sidebar}>
        <header className={header}>
          <h1 className={title}>webTunes</h1>
          <LoginButton isAuthorized={isAuthorized} />
        </header>
        <Navigation isAuthorized={isAuthorized} />
      </div>
      <div className={player} />
      <main className={main}>
        <Router>
          <Browse path="/" />
          <Browse path="browse" />
          <NotFound default />
        </Router>
      </main>
    </div>
  );
}

export default App;