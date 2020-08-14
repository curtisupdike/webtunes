import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import styles from './Nav.module.scss';

var Nav = ({ isAuthorized }) => (
	<nav className={styles.nav} style={isAuthorized ? {} : { width: 0 }}>
		<Link to="/" className={styles['logo-link']}>
			<Icon icon="record-vinyl" />
			<span>Webtunes</span>
		</Link>
		<NavLink to="/" className={styles['icon-link']}>
			<Icon icon="home" />
			<span>Home</span>
		</NavLink>
		<NavLink to="/browse" className={styles['icon-link']}>
			<Icon icon="headphones-alt" />
			<span>Browse</span>
		</NavLink>
		<div className={styles['nav-list']}>
			<h2 className={styles.heading}>Your Library</h2>
			<NavLink to="/library/songs">Songs</NavLink>
			<NavLink to="/library/albums">Albums</NavLink>
			<NavLink to="/library/artists">Artists</NavLink>

			{isAuthorized && <NavPlaylists />}
		</div>
	</nav>
);

var NavLink = ({ children, ...props }) => (
	<Link className={styles['nav-link']} {...props}>
		<div>{children}</div>
	</Link>
);

function NavPlaylists() {
	var playlists = usePlaylists();

	return (
		playlists && (
			<React.Fragment>
				<h2 className={styles.heading}>Playlists</h2>
				{playlists.map((playlist) => (
					<NavLink to={`library/playlist/${playlist.id}`} key={playlist.id}>
						{playlist.attributes.name}
					</NavLink>
				))}
			</React.Fragment>
		)
	);
}

function usePlaylists() {
	var [playlists, setPlaylists] = useState(null);

	useEffect(() => {
		var music = window.MusicKit.getInstance();
		if (music.isAuthorized) {
			music.api.library.playlists().then(setPlaylists);
		} else {
			setPlaylists(null);
		}
	}, []);

	return playlists;
}

export default Nav;
