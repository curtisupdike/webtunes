import React from 'react';
import { formatTrackDuration } from '../../utils/utils';
import styles from './AlbumTracklist.module.css';

function AlbumTracklist({tracks}) {
  return (
    <div className={styles.tracklist}>
      {tracks.map((item, key) => {
        return (
          <AlbumTrack key={key} {...item.attributes} />
        );
      })}
    </div>
  );
}

function AlbumTrack({trackNumber, name, durationInMillis}) {
  return (
    <div className={styles.track}>
      <div className={styles.trackNumber}>
        <p>{trackNumber}</p>
      </div>
      <p className={styles.name}>{name}</p>
      <p className={styles.duration}>{formatTrackDuration(durationInMillis)}</p>
    </div>
  );
}

export default AlbumTracklist;