import React from 'react';
import ReactDOM from 'react-dom';
import './utils/font-awesome-library';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

if (!window.MusicKit) {
	document.addEventListener('musickitloaded', main);
} else {
	main();
}

async function main() {
	try {
		let response = await fetch('/.netlify/functions/getDeveloperToken');
		let data = await response.json();
		window.MusicKit.configure({
			developerToken: data.developerToken,
			app: {
				name: 'Webtunes',
				build: '1.0',
			},
		});
		ReactDOM.render(<App />, document.getElementById('root'));
	} catch (error) {
		console.error(error);
		ReactDOM.render(
			<h1>There was an error loading the MusicKit Library</h1>,
			document.getElementById('root')
		);
	}
}

serviceWorker.unregister();
