import React, { useState, useEffect } from 'react';
import { music } from '../../services/music';
import Artwork from '../../components/Artwork/Artwork';
import PlaylistTracklist from '../../components/PlaylistTracklist/PlaylistTracklist';
import styles from './Playlist.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import PlayButton from '../../components/PlayButton/PlayButton';

function Playlist({id}) {
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    music.instance.api.playlist(id).then(res => {
      setPlaylist(res.attributes);
      setTracks(res.relationships.tracks.data);
    })
  }, [id]);

  const {
    artwork,
    curatorName,
    description,
    name,
    playParams
  } = {...playlist};


  return playlist ? (
    <div className={styles.playlist}>
      <div className={styles.left}>
        <Artwork
          className={styles.artwork}
          artwork={artwork} 
          name={name} 
          size="320"
        />
        <div className={styles.info}>
          <p className={styles.trackCount}>{tracks && tracks.length} Songs</p>
          <PlayButton className={styles.playButton} {...playParams} />
        </div>
        { description &&
          <div className={styles.description}>
            <h3>Editors' Notes</h3>
            <p dangerouslySetInnerHTML={{__html: description.standard}} />
          </div>
        }
      </div>
      <div className={styles.right}>
        <h1 className={styles.name}>{name}</h1>
        <h2 className={styles.curator}>{curatorName}</h2>
        { tracks && <PlaylistTracklist tracks={tracks} /> }
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
}

export default Playlist;
