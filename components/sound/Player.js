import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { withStyles } from "@material-ui/core/styles";

import styled from "styled-components";

const StyledDiv = styled.div`
  background: #ffffff;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100px;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #ccc !important;
`;

const iconStyle = {
  width: "20px",
  "margin-bottom": "-15px"
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

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle, volume, setVolume];
};

const Player = ({ url }) => {
  const [playing, toggle, volume, setVolume] = useAudio(url);

  const changeVolume = (e, newValue) => {
    var volume = newValue;
    setVolume(parseFloat(volume) / 100);
  };

  return (
    <StyledDiv>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
      <Grid container spacing={1}>
        <Grid item>
          <VolumeDown style={iconStyle} />
        </Grid>
        <Grid item xs>
          <VolumeSlider
            value={volume * 100}
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

export default Player;
