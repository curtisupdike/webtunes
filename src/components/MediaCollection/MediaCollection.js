import React from 'react';
import styles from './MediaCollection.module.css';
import ItemPreview from '../ItemPreview/ItemPreview';

function MediaCollection({data}) {
  return (
    <>
      <div className={styles.collection}>
        {data.map(item => (
          <ItemPreview 
            key={item.id}
            artwork={item.attributes.artwork}
            artworkLink={item.type === 'albums'
              ? `/album/${item.id}`
              : `/playlist/${item.id}`
            }
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
    </>
  );
}

export default MediaCollection;