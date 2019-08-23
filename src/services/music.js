const music = {
  get instance() {
    return window.MusicKit.getInstance();
  },
  get api() {
    return window.MusicKit.getInstance().api;
  },
  get player() {
    return window.MusicKit.getInstance().player;
  }
};

const user = {
  get isAuthorized() {
    return music.instance.isAuthorized;
  },

  login() {
    return music.instance.authorize();
  },

  logout() {
    return music.instance.unauthorize();
  },
};

const player = {
  playSelection(id, kind) {
    if (music.player.isPlaying) music.player.stop();
    music.instance.setQueue({
      [kind]: id,
    }).then(() => music.player.play());
  },
};

export {
  music,
  user,
  player
};