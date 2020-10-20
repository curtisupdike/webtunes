import React, { useState, useEffect } from 'react';
import LoginButton from './components/LoginButton';
import Nav from './components/Nav';
import Routes from './pages/Routes';
import Player from './components/Player';
import styles from './App.module.css';

function App() {
	let isAuthorized = useAuthorization();

	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<LoginButton isAuthorized={isAuthorized} />
			</header>
			<Nav isAuthorized={isAuthorized} />
			<Player />
			<main className={styles.main}>
				<Routes isAuthorized={isAuthorized} />
			</main>
		</div>
	);
}

function useAuthorization() {
	let mk = window.MusicKit.getInstance();
	let [isAuthorized, setIsAuthorized] = useState(mk.isAuthorized);
	useEffect(function () {
		function handleChange() {
			setIsAuthorized(mk.isAuthorized);
		}

		mk.addEventListener('authorizationStatusDidChange', handleChange);
		return function () {
			mk.removeEventListener('authorizationStatusDidChange', handleChange);
		};
	});

	return isAuthorized;
}

export default App;
