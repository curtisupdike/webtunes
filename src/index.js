import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

fetch("/.netlify/functions/getDeveloperToken")
	.then(response => response.json())
	.then(data => {
		window.MusicKit.configure({
			developerToken: data.developerToken,
			app: {
				name: 'webTunes',
				build: '0.01a',
			}
		});
		ReactDOM.render(<App />, document.getElementById('root'));
	})
	.catch(error => console.error(error));

serviceWorker.unregister();
