import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

fetch("/.netlify/functions/jwt")
	.then(response => response.json())
	.then(data => {
		console.log(data.jwt);
		window.MusicKit.configure({
			developerToken: data.jwt,
			app: {
			name: 'webTunes',
			build: '0.01a',
			}
		});
		ReactDOM.render(<App />, document.getElementById('root'));
	}).catch(error => console.error(error));

serviceWorker.unregister();
