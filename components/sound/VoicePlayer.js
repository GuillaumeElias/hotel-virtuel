export const VoicePlayer = {
  currentVoice: null,
  volume: 1,
  loadedVoices: new Map(),

  //TODO preload sounds

  playVoice: function (url) {
    if (this.loadedVoices.has(url)) {
      this.currentVoice = this.loadedVoices.get(url);
      if (this.currentVoice.loaded) {
        /*this.currentVoice.currentTime = 0;
        this.currentVoice.play();*/
        console.log("voice already played");
        return;
      }
    }

    if (
      this.currentVoice != null &&
      this.currentVoice.loaded &&
      !this.currentVoice.paused
    ) {
      this.audioVolumeOut(this.currentVoice, () => {
        try {
          this.doPlayVoice(url);
        } catch (err) {
          console.log(err);
        }
      });
    } else {
      this.doPlayVoice(url);
    }
  },

  doPlayVoice: function (url) {
    this.currentVoice = new Audio(url);
    this.loadedVoices.set(url, this.currentVoice);
    this.currentVoice.autoplay = true;

    this.currentVoice.volume = 0.01;
    this.audioVolumeIn(this.currentVoice, this.volume);

    this.currentVoice.addEventListener("canplaythrough", (event) => {
      //this.currentVoice.play();
      this.currentVoice.loaded = true;
    });
  },

  audioVolumeIn: function (a, maxVolume) {
    if (a.volume) {
      var InT = 0;
      var speed = 0.02; // Rate of increase
      a.volume = InT;
      var eAudio = setInterval(function () {
        InT += speed;
        let newVolume = InT.toFixed(2);
        if (newVolume >= maxVolume) {
          clearInterval(eAudio);
        } else {
          a.volume = newVolume;
        }
      }, 50);
    }
  },

  audioVolumeOut: function (a, atEnd) {
    if (a.volume) {
      var InT = a.volume;
      var speed = 0.06; // Rate of decrease
      a.volume = InT;
      var eAudio = setInterval(function () {
        InT -= speed;
        let newVolume = InT.toFixed(2);
        if (newVolume <= 0.01) {
          clearInterval(eAudio);
          a.pause();
          atEnd();
        } else {
          a.volume = newVolume;
        }
      }, 50);
    }
  },

  setVolume: function (newVolume) {
    this.volume = newVolume;
    if (this.currentVoice != null) {
      this.currentVoice.volume = newVolume;
    }
  }
};
