import React, { Fragment, useContext } from 'react';
import { Router } from '@reach/router';
import Home from './Home';
import Browse from './Browse';

import RecentlyAdded from '../routes/RecentlyAdded/RecentlyAdded';
import LibraryAlbums from '../routes/LibararyAlbums/LibraryAlbums';
import LibraryArtists from '../routes/LibraryArtists/LibraryArtists';
import LibrarySongs from '../routes/LibrarySongs/LibrarySongs';
import LibraryAlbum from '../routes/LibraryAlbum/LibraryAlbum';
import LibraryPlaylist from '../routes/LibraryPlaylist/LibraryPlaylist';
import Search from '../routes/Search/Search';
import Album from '../routes/Album/Album';
import Artist from '../routes/Artist/Artist';
import Playlist from '../routes/Playlist/Playlist';
import NotFound from '../components/NotFound/NotFound';
import { AuthorizeContext } from '../providers/AuthorizeProvider';

function Main() {
	let [isAuthorized] = useContext(AuthorizeContext);

	return (
		<Router>
			{isAuthorized ? (
				<Fragment>
					<Home path="/" />
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
	);
}

export default Main;
