import React from "react";
import styled from "styled-components";

import { Stage, Layer, Text } from "react-konva";
import CanvasImage from "./ui/CanvasImage";

const StyledDiv = styled.div`
  table {
  }

  th,
  td {
    padding: 15px;
  }
`;

export default class Reception extends React.Component {
  constructor() {
    super();
    this.state = { text: "Try Click on Me." };
  }

  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <CanvasImage
            src="/images/lobby"
            x={window.innerWidth / 2}
            width={window.innerWidth / 3}
            onClick={() => {
              this.props.history.push("/lobby");
            }}
          />
          <CanvasImage
            src="/images/elevator"
            x={10}
            y={210}
            width={window.innerWidth / 4}
            onClick={() => {
              this.props.history.push("/elevator");
            }}
          />
        </Layer>
      </Stage>
    );
  }
}
