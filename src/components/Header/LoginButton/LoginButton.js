import React from 'react';
import PropTypes from 'prop-types';
import { button } from './LoginButton.module.css';
import { user } from '../../../services/music';

function LoginButton({ isAuthorized }) {
	return isAuthorized ? (
		<button className={button} onClick={user.logout}>
			Sign Out
		</button>
	) : (
		<button className={button} onClick={user.login}>
			Sign In
		</button>
	);
}

LoginButton.propTypes = {
	isAuthorized: PropTypes.bool.isRequired,
};

export default LoginButton;
