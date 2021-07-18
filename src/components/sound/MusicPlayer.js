export const MusicPlayer = {
  currentMusic: null,
  volume: 1,

  setMusic(url){
    if(this.currentMusic){
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
    }
    this.currentMusic = new Audio(url);
    this.currentMusic.loop = true;
    this.currentMusic.volume = this.volume;
    this.currentMusic.play();
  },

  setVolume(newVolume) {
    this.volume = newVolume;
    if (this.currentMusic != null) {
      this.currentMusic.volume = newVolume;
    }
  },

  setPlaying(playing) {
    if(this.currentMusic){
      if(playing){
        this.currentMusic.play();
      }else{
        this.currentMusic.pause();
      }
    }
      
  },

  togglePlaying(){
    if(this.currentMusic){
        if(this.currentMusic.paused){
          this.currentMusic.play();
        }else{
          this.currentMusic.pause();
        }
    }
  }
};
