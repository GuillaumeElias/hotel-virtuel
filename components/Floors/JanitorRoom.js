import React from "react";
import CanvasImage from "../ui/CanvasImage";
import Img from "../ui/Img";
import PaintComponent from "../ui/PaintComponent";

import {
  windowWidth,
  windowLeftMargin,
  windowTopMargin
} from "../utils/screen.js";

import BackButton from "../ui/BackButton";

const JanitorRoom = ({ history }) => {
  let width = windowWidth - (windowWidth / 8 > 40 ? windowWidth / 8 : 40);
  let height = window.innerHeight - 40 - windowTopMargin;

  const [lines, setLines] = React.useState([]);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    if (e.pageY < height) {
      setMousePos({ x: e.pageX - windowLeftMargin, y: e.pageY });
    }
  };

  return (
    <div onMouseMove={onMouseMove}>
      <PaintComponent
        lines={lines}
        onChange={(lines) => {
          setLines(lines);
        }}
        x={0}
        y={0}
        width={width}
        height={height}
        hideClear
        strokeColor={"#FFFFFF"}
        strokeWidth={30}
        cursor="none"
      >
        <CanvasImage
          src="/images/floor2/janitorRoom"
          width={width}
          height={height}
          x={0}
          y={0}
        />
      </PaintComponent>

      <img
        src="/images/floor2/broom_0.png"
        alt=""
        style={{
          position: "absolute",
          top: mousePos.y - windowWidth * 0.2,
          left: mousePos.x - windowWidth * 0.08,
          pointerEvents: "none"
        }}
      />
      <BackButton path="/floor/2" history={history} />
    </div>
  );
};

export default JanitorRoom;
