export function formatArtworkURL(artwork, size) {
  return window.MusicKit.formatArtworkURL(artwork, size, size);
}

export function formatMediaTime(millis) {
  const seconds = millis / 1000;
  return window.MusicKit.formatMediaTime(seconds, ':');
}