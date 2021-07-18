import * as Tone from "tone";

export const Synth = {
  inRamp: false,
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
    this.synth.triggerAttack(`A0`);
    this.synth.oscillator.frequency.rampTo("A3", 0.6);
    this.inRamp = true;
    setTimeout(() => {
      this.inRamp = false;
    }, 600);
  },

  playShortNote: function () {
    const rndInt = Math.floor(Math.random() * 2) + 3;
    let note = "A";
    if (Math.floor(Math.random() * 2) == 0) {
      note = "D";
    }
    this.synth.triggerAttackRelease(note + "" + rndInt, "8n");
    this.synth.oscillator.set({
      frequency: this.synth.oscillator.frequency.value * 0.98
    });
  },

  stopNote: function () {
    this.synth.triggerRelease();
  },

  setFreq: function (freq) {
    if (!this.inRamp) {
      this.synth.oscillator.set({
        frequency: freq / 2 + 220
      });
    }
  },

  setVolume: function (volume) {
    this.synth.set({
      volume: volume * 20 - 20
    });
  }
};
