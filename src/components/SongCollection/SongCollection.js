import React from 'react';
import { formatTrackDuration } from '../../utils/utils';
import Artwork from '../Artwork/Artwork';
import styles from './SongCollection.module.css';

function SongCollection({data}) {
  return (
    <div className={styles.collection}>
      {data.map(item => (
        <SongItem 
          key={item.id}
          artwork={item.attributes.artwork}
          name={item.attributes.name}
          artistName={item.attributes.artistName}
          durationInMillis={item.attributes.durationInMillis}
        />
      ))}
    </div>
  )
}


function SongItem(props) {
  const { 
    artistName,
    artwork, 
    durationInMillis,
    name,
  } = {...props};

  return(
    <div className={styles.track}>
      <div className={styles.album}>
        <Artwork
          artwork={artwork}
          name={name}
          size="45"
          className={styles.artwork}
        />
      </div>
      <div className={styles.text}>
        <div className={styles.info}>
          <p className={styles.name}>{name}</p>
          <p className={styles.artistName}>{artistName}</p>
        </div>
        <p className={styles.duration}>{formatTrackDuration(durationInMillis)}</p>
      </div>
    </div>
  );
}

export default SongCollection;