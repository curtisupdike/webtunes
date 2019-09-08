import React, { useState } from 'react';
import { Link } from '@reach/router';
import { music } from '../../services/music';
import styles from './ItemPreview.module.css';
import Artwork from '../Artwork/Artwork';
import PlayButton from '../PlayButton/PlayButton';

function ItemPreview({
  artwork,
  artworkLink,
  name,
  description,
  playParams,
  album
}) {
  const [artistLink, setArtistLink] = useState(null);  
  if (album) {
    music.api.album(album)
      .then(res => {
        if (res.relationships.artists.data[0]) {
          setArtistLink(`/artist/${res.relationships.artists.data[0].id}`);
        }
      })
      .catch(e => console.error(e));
  }

  return (
    <div>
      <div className={styles.item}>
        <Link to={artworkLink} className={styles.link}>
          <Artwork 
            artwork={artwork}
            name={name}
            size={160}
            className={styles.artwork}
          />
        </Link>
        <PlayButton className={styles.playButton} {...playParams} />
      </div>
      <p className={styles.name}>{name}</p>
      { artistLink ? (
          <Link to={artistLink} className={styles.artistLink}>
            <p className={styles.description}>{description}</p>
          </Link>
        ) : (
          <p className={styles.description}>{description}</p>
        )
      }
    </div>
  );
}

export default ItemPreview;