import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { withStyles } from "@material-ui/core/styles";

import styled from "styled-components";

import { useAudio } from "./useAudio";
import { useGlobalState } from "../utils/GlobalState";

const StyledDiv = styled.div`
  background: #ffffff;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100px;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #ccc !important;
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
    marginTop: -1,
    marginLeft: -5,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

const MusicPlayer = ({ url }) => {
  const [musicPlaying, musicToggle, musicVolume, setMusicVolume] = useAudio(
    url
  );

  const [state, dispatch] = useGlobalState();

  const changeVolume = (e, newValue) => {
    var volume = parseFloat(newValue / 100);
    setMusicVolume(volume);
    dispatch({ soundVolume: volume });
  };

  return (
    <StyledDiv>
      <button onClick={musicToggle}>{musicPlaying ? "Pause" : "Play"}</button>
      <Grid container spacing={1}>
        <Grid item>
          <VolumeDown style={iconStyle} />
        </Grid>
        <Grid item xs>
          <VolumeSlider
            value={musicVolume * 100}
            onChange={changeVolume}
            aria-labelledby="continuous-slider"
          />
        </Grid>
        <Grid item>
          <VolumeUp style={iconStyle} />
        </Grid>
      </Grid>
    </StyledDiv>
  );
};

export default MusicPlayer;
