const music = {
  get instance() {
    return window.MusicKit.getInstance();
  },
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

export {
  music,
  user,
};