import React from "react";
import { Stage, Layer } from "react-konva";

import CanvasImage from "../ui/CanvasImage";
import ScrollTop from "../utils/ScrollTop.js";

import { windowWidth } from "../utils/screen.js";

const Floor1 = ({ history }) => (
  <div>
    <ScrollTop />
    <Stage width={windowWidth} height={windowWidth * 0.8}>
      <Layer>
        <CanvasImage
          src="/images/floor1/room101"
          x={windowWidth / 8}
          y={0}
          width={windowWidth * 0.3}
          onClick={() => {
            history.push("/room/101");
          }}
        />

        <CanvasImage
          src="/images/floor1/room102"
          x={windowWidth / 2}
          y={0}
          width={windowWidth * 0.3}
          onClick={() => {
            history.push("/room/101");
          }}
        />

        <CanvasImage
          src="/images/elevator"
          x={windowWidth / 8}
          y={windowWidth * 0.4}
          width={windowWidth * 0.2}
          onClick={() => {
            history.push("/elevator/1");
          }}
        />
        <CanvasImage
          src="/images/escalator"
          x={windowWidth / 2}
          y={windowWidth * 0.4}
          width={windowWidth * 0.3}
          onClick={() => {
            history.push("/escalator/1");
          }}
        />
      </Layer>
    </Stage>
  </div>
);

export default Floor1;
