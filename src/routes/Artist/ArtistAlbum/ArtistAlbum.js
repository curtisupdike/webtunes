import React, { useState, useEffect } from 'react';
import { music } from '../../../services/music';
import AlbumItem from '../../../components/AlbumItem/AlbumItem';

function ArtistAlbum({id}) {
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    music.api.album(id).then(res => {
      setAlbum(res.attributes);
    });
  }, [id]);

  return album && (
    <AlbumItem
      id={id}
      artistName={album.releaseDate.substring(0, 4)}
      artwork={album.artwork}
      name={album.name}
    />
  );
}

export default ArtistAlbum;
