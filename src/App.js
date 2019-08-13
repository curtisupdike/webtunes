import React from 'react';
import useAuthorization from './hooks/useAuthorization';
import LoginButton from './components/LoginButton/LoginButton';
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
      </div>
      <div className={player} />
      <main className={main} />
    </div>
  );
}

export default App;