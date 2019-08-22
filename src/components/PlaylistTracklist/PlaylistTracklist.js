import React from 'react';
import { formatMediaTime } from '../../utils/utils';
import Artwork from '../Artwork/Artwork';
import styles from './PlaylistTracklist.module.css';

function PlaylistTracklist({tracks}) {
  return (
    <div className={styles.tracklist}>
      {tracks.map((item, key) => {
        return (
          <PlaylistTrack key={key} {...item.attributes} />
        );
      })}
    </div>
  );
}

function PlaylistTrack(props) {
  const {
    artistName,
    albumName,
    artwork,
    name, 
    durationInMillis
  } = props;

  return (
    <div className={styles.track}>
      <div className={styles.album}>
        <Artwork 
          artwork={artwork}
          name={albumName}
          size={45}
          className={styles.artwork}
        />
      </div>
      <div className={styles.text}>
        <div className={styles.info}>
          <p className={styles.name}>{name}</p>
          <p className={styles.artistName}>{artistName}</p>
        </div>
        <p className={styles.duration}>{formatMediaTime(durationInMillis)}</p>
      </div>
    </div>
  );
}

export default PlaylistTracklist;