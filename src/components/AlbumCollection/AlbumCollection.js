import React, { Fragment } from 'react';
import styles from './AlbumCollection.module.css';
import ItemPreview from '../ItemPreview/ItemPreview';

function AlbumCollection({data}) {
  return (
    <Fragment>
      <div className={styles.collection}>
        {data.map(item => (
          <ItemPreview 
            key={item.id}
            artwork={item.attributes.artwork}
            artworkLink={`/album/${item.id}`}
            name={item.attributes.name} 
            description={item.attributes.artistName} 
          />
        ))}
      </div>
    </Fragment>
  );
}

export default AlbumCollection;