import React from "react";
import { Stage, Layer } from "react-konva";

import CanvasImage from "./ui/CanvasImage";

const Lobby = ({ history }) => {
  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight * 1.2}>
        <Layer>
          <CanvasImage
            src="/images/lobby/bar"
            x={window.innerWidth / 8}
            y={0}
            width={window.innerWidth / 1.5}
            onClick={() => {
              history.push("/bar");
            }}
          />
          <CanvasImage
            src="/images/lobby/manandplant"
            x={0}
            y={window.innerWidth / 3}
            width={window.innerWidth / 4.2}
            onClick={() => {
              history.push("/manandplant");
            }}
          />
          <CanvasImage
            src="/images/lobby/plant"
            x={window.innerWidth / 3}
            y={window.innerWidth / 3}
            width={window.innerWidth / 3}
            onClick={() => {
              history.push("/plant");
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Lobby;
