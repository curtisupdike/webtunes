import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { music } from '../../../services/music';
import styles from './ArtistAlbum.module.css';
import Artwork from '../../../components/Artwork/Artwork';
import PlayButton from '../../../components/PlayButton/PlayButton';

function ArtistAlbum({id}) {
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    music.api.album(id).then(res => {
      setAlbum(res.attributes);
    });
  }, [id]);

  return album && (
    <div>
      <div className={styles.item}>
        <Link to={`/album/${id}`} className={styles.link}>
          <Artwork 
            artwork={album.artwork}
            name={album.name}
            size={160}
            className={styles.artwork}
          />
        </Link>
        <PlayButton className={styles.playButton} {...album.playParams} />
      </div>
      <p className={styles.name}>{album.name}</p>
      <p className={styles.date}>{album.releaseDate.substring(0, 4)}</p>
    </div>
  );
}

export default ArtistAlbum;
