import React from 'react';
import styles from './Header.module.css';
import LoginButton from './LoginButton';

function Header({ isAuthorized }) {
	return (
		<header className={styles.header}>
			<LoginButton isAuthorized={isAuthorized} />
		</header>
	);
}

export default Header;
