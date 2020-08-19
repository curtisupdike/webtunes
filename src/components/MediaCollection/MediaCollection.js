import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import styles from './MediaCollection.module.css';
import MediaItem from '../MediaItem';
import ItemPreview from '../ItemPreview/ItemPreview'; // deprecated

// widths in px
const MAX = 250;
const GAP = 16;

function MediaCollection({ data, ...props }) {
	if (data) {
		return <OldMediaCollection data={data} />;
	}
	return <NewMediaCollection {...props} />;
}

function NewMediaCollection({ title, content, width: containerWidth, data }) {
	let [position, setPosition] = useState(0);
	let itemsTotal = content.length;
	let itemsInView = Math.floor(containerWidth / MAX) + 1;
	let itemWidth = (containerWidth - GAP * (itemsInView - 1)) / itemsInView;
	let offset = (itemWidth + GAP) * position;

	useEffect(controlPosition, [itemsInView, itemsTotal, position]);

	function scrollBackward() {
		setPosition(previousPosition);
	}

	function scrollForward() {
		setPosition(nextPosition);
	}

	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<h2 className={styles.title}>{title}</h2>
				<div className={styles.controls}>
					<button disabled={position === 0} onClick={scrollBackward}>
						<Icon icon="chevron-left" />
					</button>
					<button
						disabled={position + itemsInView >= itemsTotal}
						onClick={scrollForward}>
						<Icon icon="chevron-right" />
					</button>
				</div>
			</header>
			<div className={styles['content-container']}>
				<div
					className={styles.content}
					style={{
						gridAutoColumns: itemWidth,
						gap: GAP,
						transform: `translateX(-${offset}px)`,
					}}>
					{content.map(({ id, ...props }) => (
						<MediaItem key={id} size={MAX} {...props} />
					))}
				</div>
			</div>
		</section>
	);

	function controlPosition() {
		if (itemsTotal <= itemsInView) setPosition(0);
		if (position + itemsInView > itemsTotal) {
			setPosition(itemsTotal - itemsInView);
		}
	}

	function previousPosition(currentPosition) {
		let newPosition = currentPosition - itemsInView;
		if (newPosition < 0) {
			return 0;
		}
		return newPosition;
	}

	function nextPosition(currentPosition) {
		let newPosition = currentPosition + itemsInView;
		if (newPosition >= itemsTotal) {
			return itemsTotal - 1;
		}
		return newPosition;
	}
}

function OldMediaCollection({ data }) {
	console.log(data);
	return (
		<>
			<div className={styles.oldCollection}>
				{data.map((item) => (
					<ItemPreview
						key={item.id}
						artwork={item.attributes.artwork}
						artworkLink={
							item.type === 'albums'
								? `/album/${item.id}`
								: `/playlist/${item.id}`
						}
						name={item.attributes.name}
						description={
							item.type === 'albums'
								? item.attributes.artistName
								: item.attributes.curatorName
						}
						playParams={item.attributes.playParams}
					/>
				))}
			</div>
		</>
	);
}

export default MediaCollection;
