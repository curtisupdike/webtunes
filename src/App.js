import React from 'react';
import AuthorizeProvider from './providers/AuthorizeProvider';
import LoginButton from './components/LoginButton';
import Nav from './components/Nav';
import Routes from './pages/Routes';
import Player from './components/Player';
import styles from './App.module.css';

function App() {
	return (
		<AuthorizeProvider>
			<div className={styles.app}>
				<header className={styles.header}>
					<LoginButton />
				</header>
				<Nav />
				<Player />
				<main className={styles.main}>
					<Routes />
				</main>
			</div>
		</AuthorizeProvider>
	);
}

export default App;
