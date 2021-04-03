import React from "react";
import { Stage, Layer } from "react-konva";

import CanvasImage from "../ui/CanvasImage";
import ScrollTop from "../utils/ScrollTop.js";

import { windowWidth } from "../utils/screen.js";

const Floor3 = ({ history }) => (
  <div>
    <ScrollTop />
    <Stage width={windowWidth} height={windowWidth * 0.8}>
      <Layer>
        <CanvasImage
          src="/images/floor3/room301"
          x={windowWidth / 8}
          y={0}
          width={windowWidth * 0.25}
        />

        <CanvasImage
          src="/images/floor3/room302"
          x={windowWidth / 2}
          y={0}
          width={windowWidth * 0.25}
          onClick={() => {
            history.push("/room/302");
          }}
        />

        <CanvasImage
          src="/images/elevator"
          x={windowWidth / 8}
          y={windowWidth * 0.34}
          width={windowWidth * 0.18}
          onClick={() => {
            history.push("/elevator/3");
          }}
        />

        <CanvasImage
          src="/images/floor3/trapdoor"
          x={windowWidth / 2}
          y={windowWidth * 0.34}
          width={windowWidth * 0.18}
          onClick={(e) => {
            console.log("e", e);
            //history.push("/floor/rooftop");
          }}
        />
      </Layer>
    </Stage>
  </div>
);

export default Floor3;
