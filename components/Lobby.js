import React from "react";
import { Stage, Layer } from "react-konva";

import CanvasImage from "./ui/CanvasImage";
import ScrollTop from "./utils/ScrollTop.js";
import BackButton from "./ui/BackButton";

import { windowTopMargin, windowWidth } from "./utils/screen.js";

const Lobby = ({ history }) => {
  return (
    <div>
      <ScrollTop />
      <Stage
        width={windowWidth}
        height={window.innerHeight * 0.8 - windowTopMargin}
      >
        <Layer>
          <CanvasImage
            src="/images/lobby/bar"
            x={windowWidth / 8}
            y={0}
            width={windowWidth / 1.5}
            onClick={() => {
              history.push("/bar");
            }}
          />
          <CanvasImage
            src="/images/lobby/manandplant"
            x={windowWidth / 20}
            y={windowWidth / 3}
            width={windowWidth / 4.2}
            onClick={() => {
              history.push("/manandplant");
            }}
          />
          <CanvasImage
            src="/images/lobby/plant"
            x={windowWidth / 2.5}
            y={windowWidth / 3}
            width={windowWidth / 3}
            onClick={() => {
              history.push("/plant");
            }}
          />
        </Layer>
      </Stage>
      <BackButton path="/reception" history={history} />
    </div>
  );
};

export default Lobby;
