import React, { Fragment } from 'react';
import styles from './PlaylistCollection.module.css';
import PlaylistItem from '../PlaylistItem/PlaylistItem';

function PlaylistCollection({data}) {
  return (
    <Fragment>
      <div className={styles.collection}>
        {data.map(item => (
          <PlaylistItem 
            key={item.id}
            id={item.id}
            name={item.attributes.name} 
            curatorName={item.attributes.curatorName} 
            artwork={item.attributes.artwork}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default PlaylistCollection;