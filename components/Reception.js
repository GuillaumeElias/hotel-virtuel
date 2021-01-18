import React from "react";
import styled from "styled-components";

import { Stage, Layer } from "react-konva";
import CanvasImage from "./ui/CanvasImage";
import ScrollTop from "./utils/ScrollTop.js";

const StyledDiv = styled.div`
  table {
  }

  th,
  td {
    padding: 15px;
  }
`;

const Reception = ({ history }) => (
  <div>
    <ScrollTop />
    <Stage width={window.innerWidth} height={window.innerHeight * 1.5}>
      <Layer>
        <CanvasImage
          src="/images/frontdesk"
          x={0}
          width={window.innerWidth / 3}
          onClick={() => {
            history.push("/frontdesk");
          }}
        />
        <CanvasImage
          src="/images/lobby"
          x={window.innerWidth / 2}
          width={window.innerWidth / 3}
          onClick={() => {
            history.push("/lobby");
          }}
        />
        <CanvasImage
          src="/images/elevator"
          x={10}
          y={window.innerHeight / 2}
          width={window.innerWidth / 4}
          onClick={() => {
            history.push("/elevator");
          }}
        />
        <CanvasImage
          src="/images/escalator"
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          width={window.innerWidth / 3.2}
          onClick={() => {
            history.push("/escalator/0");
          }}
        />
        <CanvasImage
          src="/images/exit"
          x={10}
          y={window.innerHeight}
          percent={40}
          onClick={() => {
            history.push("/");
          }}
        />
      </Layer>
    </Stage>
  </div>
);

export default Reception;
