import React, { useState, useEffect } from 'react';
import styles from './Player.module.css';
import { music, player } from '../../services/music';

function Player() {
  return (
    <div className={styles.player}>
      <PlayerControls />
    </div>
  );
}

function PlayerControls() {
  const [isReady, setIsReady] = useState(null);
  useEffect(() => {
    const handleChange = () => setIsReady(player.isReady)
    music.instance.addEventListener('mediaCanPlay', handleChange);
    return () => music.instance.removeEventListener('mediaCanPlay', handleChange);
  });

  const [isPlaying, setIsPlaying] = useState(null);
  useEffect(() => {
    const handleChange = () => setIsPlaying(player.isPlaying);
    music.instance.addEventListener('playbackStateDidChange', handleChange);
    return () => music.instance.removeEventListener('playbackStateDidChange', handleChange);
  });

  return (
    <div className={styles.controls}>
      <button className={styles.button} disabled={!isReady} onClick={player.skipToPreviousItem} aria-label="previous song">
        <svg width="100%" height="100%" viewBox="0 0 60 60">
          <path fill="#272424" d="M32.06,29.16c6-3.94,11.42-7.41,16.74-11,2.57-1.72,3.35-1.11,3.3,1.88q-.18,10.47,0,20.93c0,3-.77,3.55-3.31,1.84-5.31-3.58-10.71-7-16.73-11v9.94c0,2.26-.81,2.6-2.66,1.38q-8.29-5.51-16.66-10.88c-2-1.26-2.2-2.17-.06-3.53q8.17-5.2,16.21-10.64c2.88-1.94,3.28-.54,3.18,2.06S32.06,25.49,32.06,29.16Z" transform="translate(0 0)"/>
        </svg>
      </button>
      {isPlaying ? (
        <button className={styles.button} disabled={!isReady} onClick={player.pause} aria-label="pause">
          <svg height="100%" width="100%" viewBox="0 0 60 60">
            <path fill="#262324" d="M14.06,29.59c0-5.5,0-11,0-16.48C14,8.28,17.14,8,20.8,8s7.29-.26,7.28,5c0,11.32,0,22.64,0,34,0,4.83-3.09,5.14-6.75,5.08s-7.3.26-7.28-5C14.06,41.24,14.06,35.41,14.06,29.59Z" transform="translate(0 0)"/><path fill="#262324"  d="M46.06,30.29c0,5.5-.09,11,0,16.48.11,5.16-3.19,5.34-7,5.34s-7.1-.13-7-5.3q.15-16.74,0-33.46C32,8.19,35.25,8,39.06,8s7.15.13,7,5.3C46,19,46.06,24.63,46.06,30.29Z" transform="translate(0 0)"/>
          </svg>

        </button>
      ) : (
        <button className={styles.button} disabled={!isReady} onClick={player.play} aria-label="play">
          <svg height="100%" width="100%" viewBox="0 0 60 60">
            <path fill="#262324" d="M14,30V11.52c0-2.81.44-4.33,3.64-2.46C28.53,15.43,39.47,21.71,50.4,28c2.67,1.54,2.3,2.82-.14,4.22Q33.85,41.64,17.49,51.15C14.71,52.77,14,51.7,14,49Q14,39.48,14,30Z"/>
          </svg>
        </button>
      )}
      <button className={styles.button} disabled={!isReady} onClick={player.skipToNextItem} aria-label="next song">
        <svg height="100%" width="100%" viewBox="0 0 60 60">
          <path fill="#272424" d="M29.6,29.2c0-3.7,0.1-6.7,0-9.6c-0.1-2.5,0.7-3,2.9-1.6c5.5,3.7,11.1,7.3,16.7,10.9c1.9,1.2,1.8,2.1,0,3.2 c-5.7,3.7-11.4,7.4-17.1,11.2c-1.8,1.1-2.4,0.5-2.4-1.3V31.9c-5.9,3.9-11.3,7.3-16.7,10.9c-2.3,1.5-3.4,1.6-3.4-1.7 c0.1-7,0.1-14,0-21c0-3,0.8-3.6,3.3-1.9C18.2,21.8,23.6,25.2,29.6,29.2z"/>
        </svg>
      </button>
    </div>
  );
}

export default Player;