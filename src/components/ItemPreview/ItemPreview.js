import React from 'react';
import { Link } from '@reach/router';
import styles from './ItemPreview.module.css';
import Artwork from '../Artwork/Artwork';

function ItemPreview({artwork, artworkLink, name, description}) {
  return(
    <div>
      <div className={styles.play}>
        <Link to={artworkLink} className={styles.link}>
          <Artwork 
            artwork={artwork}
            name={name}
            size={160}
            className={styles.artwork}
          />
        </Link>
      </div>
      <p className={styles.name}>{name}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default ItemPreview;