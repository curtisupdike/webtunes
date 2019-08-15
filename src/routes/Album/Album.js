import React, { useState, useEffect } from 'react';
import { music } from '../../services/music';
import Artwork from '../../components/Artwork/Artwork';
import AlbumTracklist from '../../components/AlbumTracklist/AlbumTracklist';
import styles from './Album.module.css';

function Album({id}) {
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    music.instance.api.album(id).then(res => {
      setAlbum(res.attributes);
      setTracks(res.relationships.tracks.data);
    })
  }, [id]);

  const {
    artistName,
    artwork,
    copyright,
    editorialNotes,
    genreNames,
    name,
    releaseDate,
    trackCount
  } = {...album};

  return album && (
    <div className={styles.album}>
      <div className={styles.left}>
        <Artwork
          className={styles.artwork}
          artwork={artwork} 
          name={name} 
          size="320"
        />
        <p className={styles.details}>{trackCount} Songs</p>
        { editorialNotes &&
          <div className={styles.notes}>
            <h3>Editors' Notes</h3>
            <p dangerouslySetInnerHTML={{__html: editorialNotes.standard}} />
          </div>
        }
      </div>
      <div className={styles.right}>
        <h1 className={styles.name}>{name}</h1>
        <h2 className={styles.artist}>{artistName}</h2>
        <p className={styles.genre}>{genreNames[0]}</p>
        { tracks && <AlbumTracklist tracks={tracks} /> }
        <div className={styles.copyright}>
          <p><strong>Released:</strong>  {releaseDate}</p>
          <p>{copyright}</p>
        </div>
      </div>
    </div>
  );
}

export default Album;
