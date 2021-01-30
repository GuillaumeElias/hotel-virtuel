import React from "react";
import { Stage, Layer } from "react-konva";

import CanvasImage from "./ui/CanvasImage";
import ScrollTop from "./utils/ScrollTop.js";

import { WINDOW_WIDTH } from "./../contants.js";

const Lobby = ({ history }) => {
  return (
    <div>
      <ScrollTop />
      <Stage width={WINDOW_WIDTH} height={window.innerHeight * 1.2}>
        <Layer>
          <CanvasImage
            src="/images/lobby/bar"
            x={WINDOW_WIDTH / 8}
            y={0}
            width={WINDOW_WIDTH / 1.5}
            onClick={() => {
              history.push("/bar");
            }}
          />
          <CanvasImage
            src="/images/lobby/manandplant"
            x={0}
            y={WINDOW_WIDTH / 3}
            width={WINDOW_WIDTH / 4.2}
            onClick={() => {
              history.push("/manandplant");
            }}
          />
          <CanvasImage
            src="/images/lobby/plant"
            x={WINDOW_WIDTH / 3}
            y={WINDOW_WIDTH / 3}
            width={WINDOW_WIDTH / 3}
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
