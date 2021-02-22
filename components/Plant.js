import React from "react";
import ImgLink from "./ui/ImgLink";
import styled from "styled-components";

import BackButton from "./ui/BackButton";

import { windowWidth } from "./utils/screen.js";

const StyledDiv = styled.div`
  display: "block";
  width: "100%";
  min-height: "60%";
  margin-left: "auto";
  margin: 20px;
  overflow: hidden;
  cursor: url(/images/lobby/wateringcan_t.png) 55 55, auto;

  img.plantImg {
    margin-left: 22px;
    margin-top: 22px;
  }

  img.plantImg:active {
    transform: rotate(30deg);
  }
`;

const Plant = ({ history }) => (
  <div>
    <StyledDiv>
      <img className="plantImg" to="/Lobby" src="/images/lobby/plant_0.png" />
      <br />
    </StyledDiv>
    <BackButton path="/lobby" history={history} />
  </div>
);

export default Plant;
