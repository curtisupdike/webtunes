import React from 'react';
import { Link } from '@reach/router';
import styles from './PlaylistItem.module.css';
import Artwork from '../Artwork/Artwork';

function PlaylistItem({id, name, curatorName, artwork}) {
  return(
    <div>
      <div className={styles.play}>
        <Link to={`/playlist/${id}`} className={styles.link}>
          <Artwork 
            artwork={artwork}
            name={name}
            size={160}
            className={styles.artwork}
          />
        </Link>
      </div>
      <p className={styles.name}>{name}</p>
      <p className={styles.curatorName}>{curatorName}</p>
    </div>
  );
}

export default PlaylistItem;