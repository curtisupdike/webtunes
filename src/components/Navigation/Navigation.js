import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import {
  label,
  active,
  forYou,
  browse,
  recentlyAdded,
  artists,
  albums,
  songs,
  playlist
} from './Navigation.module.css';

function Navigation({isAuthorized}) {
  return (
    <nav>
      <p className={label}>Apple Music</p>
      { isAuthorized && 
        <NavLink to="foryou" className={forYou}>For You</NavLink> 
      }
      <NavLink to="browse" className={browse}>Browse</NavLink>
      { isAuthorized &&
        <Fragment>
          <p className={label}>Library</p>
          <NavLink to="recentlyAdded" className={recentlyAdded}>Recently Added</NavLink>
          <NavLink to="library/albums" className={albums}>Albums</NavLink>
          <NavLink to="artists" className={artists}>Artists</NavLink>
          <NavLink to="songs" className={songs}>Songs</NavLink>
          <p className={label}>Playlists</p>
          <NavLink to="playlist" className={playlist}>Playlist</NavLink>
        </Fragment>
      }
    </nav>
  );
}

function NavLink(props) {
  return <Link getProps={isActive(props)} {...props} />;
}

function isActive({className}) {
  return function(props) {
    return props.isCurrent 
      ? { className: className + ' ' + active} 
      : { className: className };
  } 
}  

Navigation.propTypes = {
  isAuthorized: PropTypes.bool.isRequired
}

export default Navigation;