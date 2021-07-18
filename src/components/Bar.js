import React from "react";
import Img from "./ui/Img";

import {
  windowWidth,
  windowLeftMargin,
  windowTopMargin
} from "./utils/screen.js";

import BackButton from "./ui/BackButton";

import styled from "styled-components";
import { SoundPlayer } from "./sound/SoundPlayer";

const initBottleX = windowWidth / 4;
const initBottleY = windowWidth / 7;
const bottleWidth = windowWidth / 22;

const BarDivStyle = styled.div`
  img.bottle {
    position: absolute;
    left: ${initBottleX}px;
    top: ${initBottleY}px;
    width: ${bottleWidth}px;
    cursor: pointer;
  }
`;

const Bar = ({ history }) => {
  const [bottlePickedUp, setBottlePickedUp] = React.useState(false);
  const [bottleX, setBottleX] = React.useState(initBottleX);
  const [bottleY, setBottleY] = React.useState(initBottleY);

  let divStyle = {
    left: bottleX + "px",
    top: bottleY + "px"
  };

  const onMouseMove = (e) => {
    if (bottlePickedUp) {
      setBottleX(e.pageX - windowLeftMargin - bottleWidth / 2);
      setBottleY(e.pageY - bottleWidth - windowTopMargin);
    }
  };

  return (
    <BarDivStyle
      onMouseMove={onMouseMove}
      onTouchMove={(e) => {
        onMouseMove(e.touches[0]);
      }}
    >
      <img
        style={divStyle}
        alt=""
        className="bottle"
        src="/images/lobby/bottle.png"
        onClick={() => {
          SoundPlayer.playSound("/sounds/silentClick.mp3");
          setBottlePickedUp(!bottlePickedUp);
        }}
      />
      <Img width={windowWidth} to="/reception" src="/images/lobby/bar" />

      <BackButton path="/lobby" history={history} />
    </BarDivStyle>
  );
};

export default Bar;
