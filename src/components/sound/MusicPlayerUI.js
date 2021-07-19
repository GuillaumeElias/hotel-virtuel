import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { withStyles } from "@material-ui/core/styles";

import styled from "styled-components";

import { SoundPlayer } from "./SoundPlayer";
import { Synth } from "./Synth";
import { MusicPlayer } from "./MusicPlayer";
import { VoicePlayer } from "./VoicePlayer";

const StyledDiv = styled.div`
  background: #ffffff;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 15%;
  border-radius: 5px;
  padding: 0px;
  border: 0px solid #ccc !important;
  z-index: 2;
`;

const iconStyle = {
  width: "20px",
  marginBottom: "-15px"
};

const VolumeSlider = withStyles({
  root: {
    color: "#000000",
    height: 0
  },
  thumb: {
    height: 10,
    width: 10,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: '-5',
    marginLeft: '-5',
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    marginTop: '-4',
    height: '8',
    borderRadius: 4
  },
  rail: {
    marginTop: '-4',
    height: '8',
    borderRadius: '4'
  }
})(Slider);

const MusicPlayerUI = ({ url }) => {
  const [musicVolume, setMusicVolume] = React.useState(
    MusicPlayer.volume * 100
  );

  React.useEffect(() => {
    changeVolume(musicVolume);
  }, [musicVolume]);

  const changeVolume = (newValue) => {
    var volume = parseFloat(newValue / 100);
    MusicPlayer.setVolume(volume);
    SoundPlayer.setVolume(volume);
    VoicePlayer.setVolume(volume);
    Synth.setVolume(volume);
  };

  return (
    <StyledDiv>
      <Grid container spacing={1}>
        <Grid item>
          <VolumeDown style={iconStyle} onClick={() => setMusicVolume(musicVolume - 1)}/>
        </Grid>
        <Grid item xs>
          <VolumeSlider
            value={musicVolume}
            onChange={(e, newValue) => {
              setMusicVolume(newValue);
            }}
            aria-labelledby="continuous-slider"
          />
        </Grid>
        <Grid item>
          <VolumeUp style={iconStyle} onClick={() => setMusicVolume(musicVolume + 1)}/>
        </Grid>
      </Grid>
    </StyledDiv>
  );
};

export default MusicPlayerUI;
