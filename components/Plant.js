import React from "react";
import ImgLink from "./ui/ImgLink";
import styled from "styled-components";

import { windowWidth } from "./utils/screen.js";

const StyledDiv = styled.div`
  display: "block";
  width: "100%";
  margin-left: "auto";
  cursor: url(/images/lobby/wateringcan_t.png) 55 55, auto;

  img.plantImg:active {
    transform: rotate(30deg);
  }
`;

const Plant = () => (
  <StyledDiv>
    <div>
      <img className="plantImg" to="/Lobby" src="/images/lobby/plant_0.png" />
      <ImgLink src="/images/lobby" to="/lobby" width={windowWidth / 4} />
    </div>
  </StyledDiv>
);

export default Plant;
