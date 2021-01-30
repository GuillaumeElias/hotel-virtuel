import React from "react";

import { Stage, Layer } from "react-konva";
import CanvasImage from "./ui/CanvasImage";
import ScrollTop from "./utils/ScrollTop.js";

import { WINDOW_WIDTH, WINDOW_LEFT_MARGIN } from "./../contants.js";

const Reception = ({ history }) => {
  const [addX, setAddX] = React.useState(0);
  const [addY, setAddY] = React.useState(0);

  const handleMouseMove = (e) => {
    setAddX((e.pageX - WINDOW_LEFT_MARGIN) / 30);
    setAddY(e.pageY / 30);
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <ScrollTop />
      <Stage width={WINDOW_WIDTH} height={window.innerHeight * 1.5}>
        <Layer>
          <CanvasImage
            src="/images/frontdesk"
            x={0 + addX}
            y={addY}
            width={WINDOW_WIDTH / 3}
            onClick={() => {
              history.push("/frontdesk");
            }}
          />
          <CanvasImage
            src="/images/lobby"
            x={WINDOW_WIDTH / 2 + addX / 3}
            y={addY / 3}
            width={WINDOW_WIDTH / 3}
            onClick={() => {
              history.push("/lobby");
            }}
          />
          <CanvasImage
            src="/images/elevator"
            x={10 + addX / 3}
            y={window.innerHeight / 2 + addY / 3}
            width={WINDOW_WIDTH / 4}
            onClick={() => {
              history.push("/elevator");
            }}
          />
          <CanvasImage
            src="/images/escalator"
            x={WINDOW_WIDTH / 2 + addX / 2}
            y={window.innerHeight / 2 + addY / 2}
            width={WINDOW_WIDTH / 3.2}
            onClick={() => {
              history.push("/escalator/0");
            }}
          />
          <CanvasImage
            src="/images/exit"
            x={10}
            y={window.innerHeight}
            width={WINDOW_WIDTH / 6}
            onClick={() => {
              history.push("/");
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Reception;
