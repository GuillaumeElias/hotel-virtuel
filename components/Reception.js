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
            src="https://hotelvirtuel.space/images/lobby_0.png"
            x={50}
            width={window.innerWidth / 3}
            onClick={() => {
              this.props.history.push("/lobby");
            }}
          />
        </Layer>
      </Stage>
    );
  }
}
