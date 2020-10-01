import React, { useState, useEffect } from 'react';
import { music } from '../../services/music';
import styles from './LibraryAlbums.module.css';
import LibraryItemPreview from '../../components/LibraryItemPreview/LibraryItemPreview';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function LibraryAlbums() {
	const [albums, setAlbums] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		music.api.library
			.albums({
				limit: 50,
				offset: albums.length,
			})
			.then((res) =>
				res.length > 0 ? setAlbums([...albums, ...res]) : setLoading(false)
			)
			.catch((e) => console.error(e));
	}, [albums]);

	return albums.length > 0 ? (
		<div className={styles.albums}>
			{albums.map((item) => (
				<LibraryItemPreview
					key={item.id}
					artwork={item.attributes.artwork}
					artworkLink={`/library/album/${item.id}`}
					name={item.attributes.name}
					description={item.attributes.artistName}
					playParams={item.attributes.playParams}
				/>
			))}
			{loading && <LoadingSpinner />}
		</div>
	) : (
		<LoadingSpinner />
	);
}

export default LibraryAlbums;
