import React from 'react';
import { Router, Redirect } from '@reach/router';
import useAuthorization from './hooks/useAuthorization';
import LoginButton from './components/LoginButton/LoginButton';
import SearchBar from './components/SearchBar/SearchBar';
import Navigation from './components/Navigation/Navigation';
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
  const isAuthorized = useAuthorization();

  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <header className={styles.header}>
          <h1 className={styles.title}>webTunes</h1>
          <LoginButton isAuthorized={isAuthorized} />
        </header>
        <SearchBar />
        <Navigation className={styles.navigation} isAuthorized={isAuthorized} />
        <p className={styles.info}>An unoffical web player for Apple Music.</p>
      </div>
      <Player />
      <main className={styles.main}>
        <Router>
          {isAuthorized 
            ? <Redirect noThrow from="/" to="foryou" />
            : <Redirect noThrow from="/" to="browse" />
          }
          <Browse path="browse" />
          <Search path="search/:query" />
          <Album path="album/:id" />
          <Artist path="artist/:id" />
          <Playlist path="playlist/:id" />
          {isAuthorized && <ForYou path="foryou" />}
          {isAuthorized && <RecentlyAdded path="library/recent" />}
          {isAuthorized && <LibraryAlbums path="library/albums" />}
          {isAuthorized && <LibraryArtists path="library/artists" />}
          {isAuthorized && <LibrarySongs path="library/songs" />}
          {isAuthorized && <LibraryAlbum path="library/album/:id" />}
          {isAuthorized && <LibraryPlaylist path="library/playlist/:id" />}
          <NotFound default />
        </Router>
      </main>
    </div>
  );
}

export default App;