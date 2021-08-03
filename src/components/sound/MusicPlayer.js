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

    let layer = new Player(url).toDestination();
    layer.autostart = true;
    layer.loop = true;
    layer.layerVolume = 0;
    layer.volume.value = 0;

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

      let db = ratioToDb(volume * this.volume * 1.2);

      if(layerId == 3){
        console.log("layerVolume:", volume, "  this ", this.volume + " db: "+db);
      }

      this.layers[layerId].volume.rampTo(db, 0.3);
    }
  },

  setAllLayersVolume() {
    for(var i in this.layers){
      this.layers[i].volume.rampTo(ratioToDb(this.layers[i].layerVolume * this.volume * 1.2), 0.3);
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
  if(ratio > 1)ratio = 1;

  ratio = Math.log(1 + ratio)/Math.log(2);

  return ratio * 60 - 60;
}