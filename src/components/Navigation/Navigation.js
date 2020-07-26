import React, { useState, useEffect } from 'react';
import { music } from '../../services/music';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styles from './Navigation.module.css';

function Navigation({ isAuthorized, className }) {
	const [playlists, setPlaylists] = useState(null);
	useEffect(() => {
		if (isAuthorized) {
			music.api.library
				.playlists()
				.then((res) => setPlaylists(res))
				.catch((e) => console.error(e));
		} else {
			setPlaylists(null);
		}
	}, [isAuthorized]);

	return (
		<nav className={styles.nav}>
			<div className={styles.fadeIn} />
			<p className={styles.label}>Apple Music</p>
			{isAuthorized && (
				<NavLink to="foryou" className={styles.forYou}>
					For You
				</NavLink>
			)}
			<NavLink to="browse" className={styles.browse}>
				Browse
			</NavLink>
			{isAuthorized && (
				<>
					<p className={styles.label}>Library</p>
					<NavLink to="library/recent" className={styles.recent}>
						Recently Added
					</NavLink>
					<NavLink to="library/albums" className={styles.albums}>
						Albums
					</NavLink>
					<NavLink to="library/artists" className={styles.artists}>
						Artists
					</NavLink>
					<NavLink to="library/songs" className={styles.songs}>
						Songs
					</NavLink>
					<p className={styles.label}>Playlists</p>
					{playlists &&
						playlists.map((item) => (
							<NavLink
								key={item.id}
								to={`library/playlist/${item.id}`}
								className={styles.playlist}>
								{item.attributes.name}
							</NavLink>
						))}
				</>
			)}
		</nav>
	);
}

function NavLink(props) {
	return <Link getProps={isActive(props)} {...props} />;
}

function isActive({ className }) {
	return function (props) {
		return props.isCurrent
			? { className: className + ' ' + styles.active }
			: { className: className };
	};
}

Navigation.propTypes = {
	isAuthorized: PropTypes.bool.isRequired,
};

export default Navigation;
