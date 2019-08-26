import React, { Fragment } from 'react';
import styles from './MediaCollection.module.css';
import ItemPreview from '../ItemPreview/ItemPreview';

function MediaCollection({data}) {
  return (
    <Fragment>
      <div className={styles.collection}>
        {data.map(item => item.type === 'albums' ? (
          <ItemPreview 
            key={item.id}
            artwork={item.attributes.artwork}
            artworkLink={`/album/${item.id}`}
            name={item.attributes.name} 
            description={item.attributes.artistName} 
            playParams={item.attributes.playParams}
          />
        ) : (
          <ItemPreview
            key={item.id}
            artwork={item.attributes.artwork}
            artworkLink={`/playlist/${item.id}`}
            name={item.attributes.name} 
            description={item.attributes.curatorName}
            playParams={item.attributes.playParams}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default MediaCollection;