import React, { useState, useEffect } from 'react';
import { music } from '../../services/music';
import styles from './Browse.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import SongCollection from '../../components/SongCollection/SongCollection';
import MediaCollection from '../../components/MediaCollection/MediaCollection';

function Browse() {
	const [charts, setCharts] = useState(null);

	useEffect(() => {
		music.api
			.charts(['songs', 'albums', 'playlists'], { limit: 36 })
			.then((res) => setCharts(res))
			.catch((e) => console.error(e));
	}, []);

	return charts ? (
		<>
			<h1 className={styles.title}>Browse</h1>
			<h2 className={styles.heading}>Top Songs</h2>
			<SongCollection data={charts.songs[0].data} />
			<h2 className={styles.heading}>Top Albums</h2>
			<MediaCollection data={charts.albums[0].data} />
			<h2 className={styles.heading}>Top Playlists</h2>
			<MediaCollection data={charts.playlists[0].data} />
		</>
	) : (
		<LoadingSpinner />
	);
}

export default Browse;
