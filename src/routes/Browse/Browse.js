import React, { Fragment, useState, useEffect } from 'react';
import { music } from '../../services/music';
import styles from './Browse.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import SongCollection from '../../components/SongCollection/SongCollection';
import AlbumCollection from '../../components/AlbumCollection/AlbumCollection';
import PlaylistCollection from '../../components/PlaylistCollection/PlaylistCollection';

function Browse() {
  const [charts, setCharts] = useState(null);

  useEffect(() => {
    music.api.charts(['songs', 'albums', 'playlists'], { limit: 36 }).then(res => {
      setCharts(res);
    });
  }, [])

  return charts ? (
    <Fragment>
      <h1 className={styles.title}>Browse</h1>
      <h2 className={styles.heading}>Top Songs</h2>
      <SongCollection data={charts.songs[0].data} />
      <h2 className={styles.heading}>Top Albums</h2>
      <AlbumCollection data={charts.albums[0].data} />
      <h2 className={styles.heading}>Top Playlists</h2>
      <PlaylistCollection data={charts.playlists[0].data} />
    </Fragment>
  ) : (
    <LoadingSpinner />
  );
}

export default Browse;