import React, { useContext } from 'react';
import { AuthorizeContext } from '../../providers/AuthorizeProvider';
import { button } from './LoginButton.module.css';

function LoginButton() {
	let [isAuthorized, toggleIsAuthorized] = useContext(AuthorizeContext);

	return isAuthorized ? (
		<button className={button} onClick={toggleIsAuthorized}>
			Sign Out
		</button>
	) : (
		<button className={button} onClick={toggleIsAuthorized}>
			Sign In
		</button>
	);
}

export default LoginButton;
