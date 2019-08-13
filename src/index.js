import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.MusicKit.configure({
  developerToken: process.env.REACT_APP_JWT,
  app: {
    name: 'webTunes',
    build: '0.01a',
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
