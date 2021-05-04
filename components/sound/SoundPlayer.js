export const SoundPlayer = {
  currentSound: null,
  volume: 1,
  loadedSounds: new Map(),

  //TODO preload sounds

  playSound: function (url) {
    if (this.loadedSounds.has(url)) {
      this.currentSound = this.loadedSounds.get(url);
      if (this.currentSound.loaded) {
        try {
          this.currentSound.pause();
          this.currentSound.currentTime = 0;
          this.currentSound.play();
        } catch (err) {}
      }
    } else {
      this.currentSound = new Audio(url);
      this.loadedSounds.set(url, this.currentSound);
      this.currentSound.autoplay = true;
    }
    this.currentSound.volume = this.volume;

    this.currentSound.addEventListener("canplaythrough", (event) => {
      //this.currentSound.play();
      this.currentSound.loaded = true;
    });
  },

  setVolume: function (newVolume) {
    this.volume = newVolume;
    if (this.currentSound != null) {
      this.currentSound.volume = newVolume;
    }
  }
};
