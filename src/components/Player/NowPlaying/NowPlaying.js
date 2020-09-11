import React, { useState, useEffect } from 'react';
import formatArtworkURL from '../../../utils/formatArtworkURL';
import MK from '../../../services/music-kit';
import styles from './NowPlaying.module.scss';

function NowPlaying() {
	let mediaItem = useNowPlayingItem();

	return (
		mediaItem && (
			<div className={styles.container}>
				<div className={styles.artwork}>
					<img
						height="56"
						width="56"
						alt={`Cover art for ${mediaItem.albumName}`}
						src={formatArtworkURL(mediaItem.artwork, 56)}
					/>
				</div>
				<div className={styles.info}>
					<div className={styles.title}>{mediaItem.title}</div>
					<div className={styles.artist}>{mediaItem.artistName}</div>
				</div>
			</div>
		)
	);
}

function useNowPlayingItem() {
	let [mediaItem, setMediaItem] = useState(null);

	useEffect(function () {
		function handleChange(event) {
			var {
				item: { title, artwork, albumName, artistName },
			} = event;
			setMediaItem({ title, artwork, albumName, artistName });
		}
		MK.player.addEventListener('mediaItemDidChange', handleChange);
		return function cleanup() {
			MK.player.removeEventListener('mediaItemDidChange', handleChange);
		};
	});

	return mediaItem;
}

export default NowPlaying;
