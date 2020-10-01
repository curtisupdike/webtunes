import React, { createContext, useState, useEffect } from 'react';

export let AuthorizeContext = createContext([false, function () {}]);

function AuthorizeProvider({ children }) {
	let mk = window.MusicKit.getInstance();
	let isAuthorized = useAuthorization(mk);

	function toggleIsAuthorized() {
		if (isAuthorized) {
			mk.unauthorize();
		} else {
			mk.authorize();
		}
	}

	return (
		<AuthorizeContext.Provider value={[isAuthorized, toggleIsAuthorized]}>
			{children}
		</AuthorizeContext.Provider>
	);
}

function useAuthorization(mkInstance) {
	let [isAuthorized, setIsAuthorized] = useState(mkInstance.isAuthorized);
	useEffect(function () {
		function handleChange() {
			setIsAuthorized(mkInstance.isAuthorized);
		}

		mkInstance.addEventListener('authorizationStatusDidChange', handleChange);
		return function () {
			mkInstance.removeEventListener(
				'authorizationStatusDidChange',
				handleChange
			);
		};
	});

	return isAuthorized;
}

export default AuthorizeProvider;
