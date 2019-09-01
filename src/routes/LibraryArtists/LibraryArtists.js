import React, { useState, useEffect } from 'react';
import { music } from '../../services/music';
import styles from './LibraryArtists.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import LibraryAlbum from '../LibraryAlbum/LibraryAlbum';

function LibraryArtists() {
	const [artists, setArtists] = useState(null);
	const [selected, setSelected] = useState(null);
	useEffect(() => {
		music.api.library.artists({limit: 10000}).then(res => {
			setArtists(res);
			setSelected(res[0].id);
		});
	}, []);


	function handleClick(e, id) {
		setSelected(id);
	}

	return artists ? (
		<div className={styles.container}>
			<div className={styles.artists}>
				{artists.map((item, key) => (
					<a
						href={`#/${item.id}`}
						key={item.id} 
						className={item.id === selected
							? styles.selected
							: styles.artist
						}
						onClick={e => handleClick(e, item.id)}
					>
						{item.attributes.name}
					</a>
				))}
			</div>
			{selected
				? <ArtistAlbums id={selected} />
				: <LoadingSpinner />
			}
		</div>
	) : (
		<LoadingSpinner />
	);
}

function ArtistAlbums({id}) {
	const [content, setContent] = useState(null);
	useEffect(() => {
		music.api.library.artistRelationship(id).then(res => setContent(res));
	}, [id]);

	return content ? (
		<div className={styles.albums}>
			{content.map((item, key) => (
				<LibraryAlbum key={key} id={item.id} />
			))}
		</div>
	) : (
		<LoadingSpinner />
	);
}

export default LibraryArtists;