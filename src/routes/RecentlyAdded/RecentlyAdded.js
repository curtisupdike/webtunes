import React, {Fragment, useState, useEffect} from 'react';
import styles from './RecentlyAdded.module.css';
import LibraryItemPreview from '../../components/LibraryItemPreview/LibraryItemPreview';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function RecentlyAdded() {
  const [media, setMedia] = useState(null);
  useEffect(() => {
    const music = window.MusicKit.getInstance();
    music.api.library.recentlyAdded().then(res => {
      setMedia(res);
    })
  }, []);

  return media ? (
    <Fragment>
      <h1 className={styles.title}>Recently Added</h1>
      <div className={styles.media}>
        {media.map(item => (
          <LibraryItemPreview 
            key={item.id}
            artwork={item.attributes.artwork}
            artworkLink={item.type === 'library-albums'
              ? `/library/album/${item.id}`
              : `/library/playlist/${item.id}`
            }
            name={item.attributes.name}
            description={item.attributes.artistName}
            playParams={item.attributes.playParams}
          />
        ))}
      </div>
    </Fragment>
  ) : (
    <LoadingSpinner />
  );
}

export default RecentlyAdded;