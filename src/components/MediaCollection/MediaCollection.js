import React, { Fragment } from 'react';
import styles from './MediaCollection.module.css';
import ItemPreview from '../ItemPreview/ItemPreview';

function MediaCollection({data}) {
  return (
    <Fragment>
      <div className={styles.collection}>
        {data.map(item => (
          <ItemPreview 
            key={item.id}
            artwork={item.attributes.artwork}
            artworkLink={`/album/${item.id}`}
            name={item.attributes.name} 
            description={item.type === 'albums'
              ? item.attributes.artistName
              : item.attributes.curatorName
            } 
            playParams={item.attributes.playParams}
            album={item.type === 'albums'
             ? item.id
             : null
            }
          />
        ))}
      </div>
    </Fragment>
  );
}

export default MediaCollection;