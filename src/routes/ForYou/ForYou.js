import React, { Fragment, useState, useEffect } from 'react';
import { music } from '../../services/music';
import styles from './ForYou.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import MediaCollection from '../../components/MediaCollection/MediaCollection';

function ForYou() {
  const [recommendations, setRecomendations] = useState(null);
  useEffect(() => {
    music.api.recommendations()
      .then(res => setRecomendations(res));
  }, [])

  return recommendations ? (
    <>
      <h1 className={styles.title}>For You</h1>
      {recommendations.map((item, key) => (
        <Fragment key={key}>
          <h2 className={styles.heading}>
            {item.attributes.title.stringForDisplay}
          </h2>
          <MediaCollection data={item.relationships.contents.data} />
        </Fragment>
      ))}
    </>
  ) : (
    <LoadingSpinner />
  );
}

export default ForYou;