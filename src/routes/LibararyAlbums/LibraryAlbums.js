import React, {useState, useEffect} from 'react';
import styles from './LibraryAlbums.module.css';
import ItemPreview from '../../components/ItemPreview/ItemPreview';
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
        <ItemPreview 
          key={item.id}
          artwork={item.attributes.artwork}
          artworkLink={`/library/album/${item.id}`}
          name={item.attributes.name}
          description={item.attributes.artistName}
          playParams={item.attributes.playParams}
          album={item.id}
        />
      ))}
    </div>
  ) : (
    <LoadingSpinner />
  );
}

export default LibraryAlbums;