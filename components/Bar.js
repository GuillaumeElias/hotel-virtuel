import React from "react";
import Img from "./ui/Img";

import { windowWidth, windowLeftMargin } from "./utils/screen.js";

import BackButton from "./ui/BackButton";

import styled from "styled-components";

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
      setBottleY(e.pageY - bottleWidth);
    }
  };

  return (
    <BarDivStyle onMouseMove={onMouseMove}>
      <img
        style={divStyle}
        alt=""
        className="bottle"
        src="/images/lobby/bottle.png"
        onClick={() => setBottlePickedUp(!bottlePickedUp)}
      />
      <Img width={windowWidth} to="/reception" src="/images/lobby/bar" />

      <BackButton path="/lobby" history={history} />
    </BarDivStyle>
  );
};

export default Bar;
