import React, { Fragment } from 'react';
import styles from './PlaylistCollection.module.css';
import ItemPreview from '../ItemPreview/ItemPreview';

function PlaylistCollection({data}) {
  return (
    <Fragment>
      <div className={styles.collection}>
        {data.map(item => (
          <ItemPreview
            key={item.id}
            artwork={item.attributes.artwork}
            artworkLink={`/playlist/${item.id}`}
            name={item.attributes.name}
            description={item.attributes.curatorName}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default PlaylistCollection;