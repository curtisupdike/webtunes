import React, { useState, useEffect } from 'react';
import { music, user } from './services/music';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Player from './components/Player';
import styles from './App.module.css';

function App() {
	let isAuthorized = useAuthorization();

	return (
		<div className={styles.app}>
			<Header isAuthorized={isAuthorized} />
			<Nav isAuthorized={isAuthorized} />
			<Player isAuthorized={isAuthorized} />
			<Main isAuthorized={isAuthorized} />
		</div>
	);
}

function useAuthorization() {
	const [isAuthorized, setIsAuthorized] = useState(user.isAuthorized);
	useEffect(() => {
		const handleChange = () => {
			setIsAuthorized(user.isAuthorized);
		};

		music.instance.addEventListener(
			'authorizationStatusDidChange',
			handleChange
		);
		return () => {
			music.instance.removeEventListener(
				'authorizationStatusDidChange',
				handleChange
			);
		};
	});

	return isAuthorized;
}

export default App;
