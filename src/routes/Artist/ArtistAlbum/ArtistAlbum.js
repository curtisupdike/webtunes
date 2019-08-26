import React, { useState, useEffect } from 'react';
import { music } from '../../../services/music';
import ItemPreview from '../../../components/ItemPreview/ItemPreview';

function ArtistAlbum({id}) {
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    music.api.album(id).then(res => {
      setAlbum(res.attributes);
    });
  }, [id]);

  return album && (
    <ItemPreview
      id={id}
      artwork={album.artwork}
      artworkLink={`/album/${id}`}
      description={album.releaseDate.substring(0, 4)}
      name={album.name}
      playParams={album.playParams}
    />
  );
}

export default ArtistAlbum;
