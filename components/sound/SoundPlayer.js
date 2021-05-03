import React from "react";
import useAudio from "./useAudio";
import useGlobalState from "../utils/GlobalState";

export const SoundPlayer = {
  currentSound: null,

  loadedSounds: new Map(),

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

    //let state = useGlobalState();

    this.currentSound.addEventListener("canplaythrough", (event) => {
      //this.currentSound.play();
      this.currentSound.loaded = true;
    });
  }
};
