import React from "react";
import { Link } from "react-router-dom";

import Konva from "konva";
import { Stage, Layer, Circle, Rect, Line } from "react-konva";

import { windowWidth, windowLeftMargin } from "./utils/screen.js";
import { Pool } from "@material-ui/icons";

const interiorTopY = windowWidth * 0.1;
const exteriorTopY = 20;

const exteriorRightX = windowWidth * 0.8;
const exteriorLeftX = windowWidth * 0.1;
const interiorRightX = windowWidth * 0.7;
const interiorLeftX = windowWidth * 0.2;

const interiorBottomY = windowWidth * 0.6;
const exteriorBottomY = windowWidth * 0.7;

const initCirclePosX = windowWidth / 2;
const initCirclePosY = windowWidth * 0.3;

const Elevator = ({ match, history }) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [circlePos, setCirclePos] = React.useState({
    x: initCirclePosX,
    y: initCirclePosY
  });
  const [points, setPoints] = React.useState([
    { x: exteriorLeftX, y: exteriorTopY },
    { x: exteriorRightX, y: exteriorTopY },
    { x: interiorLeftX, y: interiorTopY },
    { x: interiorRightX, y: interiorTopY },
    { x: interiorLeftX, y: interiorBottomY },
    { x: interiorRightX, y: interiorBottomY },
    { x: exteriorLeftX, y: exteriorBottomY },
    { x: exteriorRightX, y: exteriorBottomY }
  ]);

  const onMouseMove = (e) => {
    setMousePos({ x: e.pageX - windowLeftMargin, y: e.pageY });

    let addX = (e.pageX - windowLeftMargin - windowWidth / 2) / 5;
    let addY = (e.pageY - window.innerHeight / 2) / 5;
    setPoints([
      { x: exteriorLeftX, y: exteriorTopY },
      { x: exteriorRightX, y: exteriorTopY },
      { x: interiorLeftX + addX, y: interiorTopY + addY },
      { x: interiorRightX + addX, y: interiorTopY + addY },
      { x: interiorLeftX + addX, y: interiorBottomY + addY },
      { x: interiorRightX + addX, y: interiorBottomY + addY },
      { x: exteriorLeftX, y: exteriorBottomY },
      { x: exteriorRightX, y: exteriorBottomY }
    ]);

    setCirclePos({ x: initCirclePosX + addX, y: initCirclePosY + addY });
  };

  return (
    <div onMouseMove={onMouseMove}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {/* top lines */}
          <Line
            points={[points[0].x, points[0].y, points[1].x, points[1].y]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[points[2].x, points[2].y, points[3].x, points[3].y]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[points[0].x, points[0].y, points[2].x, points[2].y]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[points[1].x, points[1].y, points[3].x, points[3].y]}
            stroke="black"
            strokeWidth={3}
          />

          {/* vertical lines */}
          <Line
            points={[points[2].x, points[2].y, points[4].x, points[4].y]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[points[3].x, points[3].y, points[5].x, points[5].y]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[points[0].x, points[0].y, points[6].x, points[6].y]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[points[1].x, points[1].y, points[7].x, points[7].y]}
            stroke="black"
            strokeWidth={3}
          />

          {/* bottom lines */}
          <Line
            points={[points[6].x, points[6].y, points[7].x, points[7].y]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[points[4].x, points[4].y, points[5].x, points[5].y]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[points[4].x, points[4].y, points[6].x, points[6].y]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[points[5].x, points[5].y, points[7].x, points[7].y]}
            stroke="black"
            strokeWidth={3}
          />

          <Circle
            x={circlePos.x}
            y={circlePos.y}
            radius={10}
            fillLinearGradientStartPoint={{ x: 0, y: 0 }}
            fillLinearGradientEndPoint={{
              x: mousePos.x - circlePos.x,
              y: mousePos.y - circlePos.y
            }}
            fillLinearGradientColorStops={[0, "red", 1, "green"]}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Elevator;
