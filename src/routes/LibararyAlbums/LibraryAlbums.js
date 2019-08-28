import React, {useState, useEffect} from 'react';
import styles from './LibraryAlbums.module.css';
import LibraryItemPreview from '../../components/LibraryItemPreview/LibraryItemPreview';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function LibraryAlbums() {
  const [albums, setAlbums] = useState(null);
  useEffect(() => {
    const music = window.MusicKit.getInstance();
    music.api.library.albums({limit: 10000}).then(res => {
      setAlbums(res);
    })
  }, []);

  return albums ? (
    <div className={styles.albums}>
      {albums.map(item => (
        <LibraryItemPreview 
          key={item.id}
          artwork={item.attributes.artwork}
          artworkLink={`/library/album/${item.id}`}
          name={item.attributes.name}
          description={item.attributes.artistName}
          playParams={item.attributes.playParams}
        />
      ))}
    </div>
  ) : (
    <LoadingSpinner />
  );
}

export default LibraryAlbums;