import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { music } from '../../services/music';
import Artwork from '../../components/Artwork/Artwork';
import AlbumTracklist from '../../components/AlbumTracklist/AlbumTracklist';
import styles from './Album.module.css';

function Album({id}) {
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    music.api.album(id).then(res => {
      setAlbum(res);
    })
  }, [id]);

  return album && (
    <div className={styles.album}>
      <div className={styles.left}>
        <Artwork
          className={styles.artwork}
          artwork={album.attributes.artwork} 
          name={album.attributes.name} 
          size="320"
        />
        <p className={styles.details}>{album.attributes.trackCount} Songs</p>
        { album.attributes.editorialNotes &&
          <div className={styles.notes}>
            <h3>Editors' Notes</h3>
            <p dangerouslySetInnerHTML={{__html: album.attributes.editorialNotes.standard}} />
          </div>
        }
      </div>
      <div className={styles.right}>
        <h1 className={styles.name}>{album.attributes.name}</h1>
        <Link 
          to={`/artist/${album.relationships.artists.data[0].id}`}
          className={styles.artist}
        >
          {album.attributes.artistName}
        </Link>
        <p className={styles.genre}>{album.attributes.genreNames[0]}</p>
        <AlbumTracklist tracks={album.relationships.tracks.data} />
        <div className={styles.copyright}>
          <p><strong>Released:</strong>  {album.attributes.releaseDate}</p>
          <p>{album.attributes.copyright}</p>
        </div>
      </div>
    </div>
  );
}

export default Album;
