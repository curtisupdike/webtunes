import React from 'react';
import { Link } from '@reach/router';
import styles from './AlbumItem.module.css';
import Artwork from '../Artwork/Artwork';

function AlbumItem({id, name, artistName, artwork}) {
  return(
    <div>
      <div className={styles.play}>
        <Link to={`/album/${id}`} className={styles.link}>
          <Artwork 
            artwork={artwork}
            name={name}
            size={160}
            className={styles.artwork}
          />
        </Link>
      </div>
      <p className={styles.name}>{name}</p>
      <p className={styles.artistName}>{artistName}</p>
    </div>
  );
}

export default AlbumItem;