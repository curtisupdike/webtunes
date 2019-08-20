import React, { Fragment } from 'react';
import styles from './AlbumCollection.module.css';
import AlbumItem from '../AlbumItem/AlbumItem';

function AlbumCollection({title, data}) {
  return (
    <Fragment>
      <div className={styles.collection}>
        {data.map(item => (
          <AlbumItem 
            key={item.id}
            id={item.id}
            name={item.attributes.name} 
            artistName={item.attributes.artistName} 
            artwork={item.attributes.artwork}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default AlbumCollection;