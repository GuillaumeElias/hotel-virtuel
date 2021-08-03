import { Player } from "tone";

export const MusicPlayer = {
  currentMusic: null,
  volume: 1,
  layers: [],

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
    this.setAllLayersVolume(newVolume);
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
  },

  addLayer(url){

    const layerId = this.layers.length;

    this.layers[layerId] = new Player(url).toDestination();
    this.layers[layerId].autostart = true;
    this.layers[layerId].loop = true;
    this.layers[layerId].layerVolume = 0;
    this.layers[layerId].volume.value = 0;

    return layerId;
  },

  setLayerVolume(layerId, volume){

    if(isNaN(volume)){
      return;
    }

    if(volume < 0){
      volume = 0;
    }else if(volume > 1){
      volume = 1;
    }

    if(this.layers[layerId]){
      this.layers[layerId].layerVolume = volume;
      this.layers[layerId].volume.rampTo(ratioToDb(volume * this.volume));
    }
  },

  setAllLayersVolume(volume) {
    for(var i in this.layers){
      this.layers[i].volume.rampTo(ratioToDb(this.layers[i].layerVolume * volume));
    }
  },

  removeAllLayers(){
    for(var i in this.layers){
      this.layers[i].stop();
    }
    this.layers.splice(0, this.layers.length);
  }
};

function ratioToDb(ratio){
  return ratio * 25 - 25;
}