import React from 'react';
import formatArtworkURL from '../../utils/formatArtworkURL';
import styles from './MediaItem.module.scss';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

function MediaCollectionItem({ attributes, size }) {
	var music = window.MusicKit.getInstance();
	var { artwork, name, playParams } = attributes;
	playParams = { [playParams.kind]: playParams.id };

	function play() {
		music
			.setQueue(playParams)
			.then(() => music.player.play())
			.catch((error) => console.error(error));
	}

	return (
		<div className={styles.mediaItem}>
			<img src={formatArtworkURL(artwork, size)} alt={`Artwork for ${name}`} />
			<div>
				<button onClick={play}>
					<Icon icon="play-circle" size="3x" />
				</button>
			</div>
		</div>
	);
}

export default MediaCollectionItem;
