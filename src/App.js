import React from 'react';
import useAuthorization from './hooks/useAuthorization';
import LoginButton from './components/LoginButton/LoginButton';

function App() {
  const isAuthorized = useAuthorization();

  return (
    <div className="App">
      <LoginButton isAuthorized={isAuthorized} />
    </div>
  );
}

export default App;