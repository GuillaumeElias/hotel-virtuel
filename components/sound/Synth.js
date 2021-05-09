import * as Tone from "tone";

export const Synth = {
  synth: new Tone.Synth({
    /*oscillator: {
      type: "square",
      modulationType: "sawtooth",
      modulationIndex: 3,
      harmonicity: 3.4
    },
    envelope: {
      attackCurve: "exponential",
      attack: 2,
      decay: 0.0,
      sustain: 1,
      release: 0.1
    }*/
  }).chain(new Tone.Reverb({ wet: 0.6 }).toDestination()),

  playNote: function () {
    this.synth.triggerAttack(`A2`, "8n");
  },

  stopNote: function () {
    this.synth.triggerRelease();
  },

  setFreq: function (freq) {
    this.synth.oscillator.set({
      frequency: freq / 2 + 110
    });
  },

  setVolume: function (volume) {
    this.synth.set({
      volume: volume * 20 - 20
    });
  }
};
