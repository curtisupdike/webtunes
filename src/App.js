import React, { useState, useEffect, Fragment } from 'react';
import { Router } from '@reach/router';
import { music, user } from './services/music';
import Nav from './components/Nav';
import Player from './components/Player/Player';
import ForYou from './routes/ForYou/ForYou';
import Browse from './routes/Browse/Browse';
import RecentlyAdded from './routes/RecentlyAdded/RecentlyAdded';
import LibraryAlbums from './routes/LibararyAlbums/LibraryAlbums';
import LibraryArtists from './routes/LibraryArtists/LibraryArtists';
import LibrarySongs from './routes/LibrarySongs/LibrarySongs';
import LibraryAlbum from './routes/LibraryAlbum/LibraryAlbum';
import LibraryPlaylist from './routes/LibraryPlaylist/LibraryPlaylist';
import Search from './routes/Search/Search';
import Album from './routes/Album/Album';
import Artist from './routes/Artist/Artist';
import Playlist from './routes/Playlist/Playlist';
import NotFound from './components/NotFound/NotFound';
import styles from './App.module.css';

function App() {
	var isAuthorized = useAuthorization();

	return (
		<div className={styles.app}>
			<div className={styles.sidebar}>
				{isAuthorized && <Nav isAuthorized={isAuthorized} />}
			</div>
			<Player isAuthorized={isAuthorized} />
			<main className={styles.main}>
				<Router>
					{isAuthorized ? (
						<Fragment>
							<ForYou path="/" />
							<Browse path="browse" />
						</Fragment>
					) : (
						<Browse path="/" />
					)}
					<Search path="search/:query" />
					<Album path="album/:id" />
					<Artist path="artist/:id" />
					<Playlist path="playlist/:id" />
					{isAuthorized && (
						<Fragment>
							<RecentlyAdded path="library/recent" />
							<LibraryAlbums path="library/albums" />
							<LibraryArtists path="library/artists" />
							<LibrarySongs path="library/songs" />
							<LibraryAlbum path="library/album/:id" />
							<LibraryPlaylist path="library/playlist/:id" />
						</Fragment>
					)}
					<NotFound default />
				</Router>
			</main>
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
