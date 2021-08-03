import { Player, Gain } from "tone";

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
    this.setAllLayersVolume();
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

    const gainNode = new Gain(0).toDestination();

    let layer = new Player(url);
    layer.connect(gainNode);
    layer.autostart = true;
    layer.loop = true;
    layer.layerVolume = 0;

    layer.gainNode = gainNode;

    gainNode.gain.value = 0;



    this.layers.push(layer);

    return layerId;
  },

  setLayerVolume(layerId, volume){

    if(isNaN(volume)){
      console.error("not a number");
      volume = 0;
    }

    if(volume < 0){
      volume = 0;
    }else if(volume > 1){
      volume = 1;
    }

    if(this.layers[layerId]){
      this.layers[layerId].layerVolume = volume;
      this.layers[layerId].gainNode.gain.rampTo(volume * this.volume, 0.3);
    }
  },

  setAllLayersVolume() {
    for(var i in this.layers){
      this.layers[i].gainNode.gain.rampTo(this.layers[i].layerVolume * this.volume, 0.3);
    }
  },

  removeAllLayers(){
    for(var i in this.layers){
      this.layers[i].stop();
    }
    this.layers.splice(0, this.layers.length);
  }
};
