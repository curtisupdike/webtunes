import React, { useState, useEffect } from 'react';
import styles from './Player.module.css';
import { music, player } from '../../services/music';
import Artwork from '../Artwork/Artwork';
import LoginButton from '../LoginButton/LoginButton';
import { 
  PreviousButton,
  PauseButton,
  PlayButton,
  NextButton
} from './Buttons/Buttons';

function Player({isAuthorized}) {
  return (
    <div className={styles.player}>
      <NowPlaying />
      <Controls />
      <header className={styles.header}>
        <h1 className={styles.title}>webTunes</h1>
        <LoginButton isAuthorized={isAuthorized} />
      </header>
    </div>
  );
}

function NowPlaying() {
  const [nowPlayingItem, setNowPlayingItem] = useState(null);
  useEffect(() => {
    const handleChange = () => {
      setNowPlayingItem(player.nowPlayingItem);
    }
    music.instance.addEventListener('mediaItemDidChange', handleChange);
    return () => music.instance.removeEventListener('mediaItemDidChange', handleChange);
  });

  return nowPlayingItem && (
    <div className={styles.nowPlaying}>
      <Artwork
        artwork={nowPlayingItem.artwork}
        name={nowPlayingItem.albumName}
        size="45"
        className={styles.artwork}
      />
      <div className={styles.text}>
        <p className={styles.name}>{nowPlayingItem.title}</p>
        <p className={styles.albumInfo}>{nowPlayingItem.albumInfo}</p>
      </div>
    </div>
  );
}

function Controls() {
  const [isReady, setIsReady] = useState(null);
  useEffect(() => {
    const handleChange = () => setIsReady(player.isReady);
    music.instance.addEventListener('mediaCanPlay', handleChange);
    return () => music.instance.removeEventListener('mediaCanPlay', handleChange);
  });

  const [isPlaying, setIsPlaying] = useState(null);
  useEffect(() => {
    const handleChange = () => setIsPlaying(music.player.isPlaying);
    music.player.addEventListener('playbackStateDidChange', handleChange);
    return () => music.player.removeEventListener('playbackStateDidChange', handleChange);
  });

  return (
    <div className={styles.controls}>
      <PreviousButton onClick={player.skipToPreviousItem} disabled={!isReady} />
      {isPlaying
        ? <PauseButton  onClick={player.pause} disabled={!isReady} />
        : <PlayButton onClick={player.play} disabled={!isReady} />
      }
      <NextButton onClick={player.skipToNextItem} disabled={!isReady} />
    </div>
  );
}

export default Player;
