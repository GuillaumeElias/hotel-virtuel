import React from "react";
import CanvasImage from "../ui/CanvasImage";
import PaintComponent from "../ui/PaintComponent";

import { windowWidth } from "../utils/screen.js";

const JanitorRoom = ({ history }) => {
  let width = windowWidth;
  let height = window.innerHeight / 2;

  const [lines, setLines] = React.useState([]);

  return (
    <div>
      <PaintComponent
        lines={lines}
        onChange={(lines) => {
          setLines(lines);
        }}
        x={0}
        y={0}
        width={width - (windowWidth / 8 > 40 ? windowWidth / 8 : 40)}
        height={height}
        hideClear
        strokeColor={"#FFFFFF"}
        strokeWidth={20}
      >
        <CanvasImage
          src="/images/elevator"
          x={0}
          y={0}
          width={windowWidth * 0.2}
        />
      </PaintComponent>
    </div>
  );
};

export default JanitorRoom;
