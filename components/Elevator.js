import React from "react";

import Konva from "konva";
import { Stage, Layer, Circle, Text, Line } from "react-konva";

import {
  windowWidth,
  windowLeftMargin,
  windowTopMargin
} from "./utils/screen.js";
import UrlImg from "./ui/UrlImg.js";
import CanvasImage from "./ui/CanvasImage.js";
import { SoundPlayer } from "./sound/SoundPlayer.js";
import { Synth } from "./sound/Synth.js";

const initCircleRadius = windowWidth / 40;

const ButtonCircle = ({ circle, mousePos, onClick }) => {
  const [radius, setRadius] = React.useState(initCircleRadius);
  const [action, setAction] = React.useState(false);

  const circleRef = React.useRef();

  React.useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      if (action) {
        setRadius(radius + frame.timeDiff);
        if (radius > 3000) {
          Synth.stopNote();
          setAction(false);
          setRadius(initCircleRadius);
        }
      }
    });

    anim.start();

    return () => {
      anim.stop();
    };
  });

  const handleClick = (e) => {
    if (!action) {
      circleRef.current.zIndex(18);

      onClick();
      setAction(true);
    }
  };

  return (
    <Circle
      ref={circleRef}
      x={circle.x}
      y={windowTopMargin + circle.y}
      radius={radius}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{
        x: mousePos.x - circle.x,
        y: mousePos.y - circle.y
      }}
      fillLinearGradientColorStops={[
        0,
        circle.active ? "red" : "blue",
        1,
        "green"
      ]}
      onMouseEnter={(e) => {
        // style stage container:
        const container = e.target.getStage().container();
        container.style.cursor = "pointer";
      }}
      onMouseLeave={(e) => {
        const container = e.target.getStage().container();
        container.style.cursor = "default";
      }}
      onClick={handleClick}
      onTouchEnd={handleClick}
    />
  );
};

const interiorTopY = windowWidth * 0.1;
const exteriorTopY = 20;

const exteriorRightX = windowWidth * 0.8;
const exteriorLeftX = windowWidth * 0.1;
const interiorRightX = windowWidth * 0.7;
const interiorLeftX = windowWidth * 0.2;

const interiorBottomY = windowWidth * 0.6;
const exteriorBottomY = windowWidth * 0.7;

const buttonBoxWidth = windowWidth / 4;
const initButtonsPosX = windowWidth / 3;
const initButtonsPosY = windowWidth / 5;

const circlesX = windowWidth / 2;
const circle0Y = windowWidth * 0.275;
const circle1Y = windowWidth * 0.332;
const circle2Y = windowWidth * 0.394;
const circle3Y = windowWidth * 0.45;

const Elevator = ({ match, history }) => {
  const floorNb = parseInt(match.params.floorNb, 10);

  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [circles, setCircles] = React.useState([
    { x: circlesX, y: circle0Y, active: floorNb === 3 },
    { x: circlesX, y: circle1Y, active: floorNb === 2 },
    { x: circlesX, y: circle2Y, active: floorNb === 1 },
    { x: circlesX, y: circle3Y, active: floorNb === 0 }
  ]);
  const [buttonsPos, setButtonsPos] = React.useState({
    x: initButtonsPosX,
    y: initButtonsPosY
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

    setCircles([
      { x: circlesX + addX, y: circle0Y + addY, active: floorNb === 3 },
      { x: circlesX + addX, y: circle1Y + addY, active: floorNb === 2 },
      { x: circlesX + addX, y: circle2Y + addY, active: floorNb === 1 },
      { x: circlesX + addX, y: circle3Y + addY, active: floorNb === 0 }
    ]);

    setButtonsPos({ x: initButtonsPosX + addX, y: initButtonsPosY + addY });

    Synth.setFreq(addY);
  };

  const setActiveCircle = (circleIndex) => {
    Synth.playNote();

    let newcircles = { ...circles };
    for (var i in newcircles) {
      newcircles[i].active = false;
    }
    newcircles[circleIndex].active = true;
    setCircles(newcircles);
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onTouchMove={(e) => {
        onMouseMove(e.changedTouches[0]);
      }}
      style={{ marginTop: -windowTopMargin }}
    >
      <Stage width={window.innerWidth} height={window.innerHeight - 100}>
        <Layer zIndex={1}>
          <Text
            x={buttonsPos.x + buttonBoxWidth / 2 - 10}
            y={windowTopMargin + buttonsPos.y - windowWidth / 40}
            fontFamily="courier"
            fill="green"
            shadowColor="black"
            shadowBlur={10}
            shadowOffset={{ x: 1, y: -1 }}
            fontSize={18}
            text={floorNb.toString()}
          />

          <UrlImg
            x={buttonsPos.x}
            y={windowTopMargin + buttonsPos.y}
            width={buttonBoxWidth}
            height={buttonBoxWidth * 1.4}
            src="/images/elevator/elevatorButtons.png"
          />

          <CanvasImage
            x={buttonsPos.x + buttonBoxWidth + 10}
            y={windowTopMargin + buttonsPos.y + buttonBoxWidth + 10}
            width={buttonBoxWidth / 5}
            height={buttonBoxWidth / 5}
            src="/images/elevator/openDoors"
            onClick={() => history.push(`/floor/${floorNb}`)}
            onTouchEnd={() => history.push(`/floor/${floorNb}`)}
          />

          <ButtonCircle
            onClick={() => {
              history.push("/elevator/3");
              setActiveCircle(0);
            }}
            mousePos={mousePos}
            circle={circles[0]}
          />
          <ButtonCircle
            onClick={() => {
              history.push("/elevator/2");
              setActiveCircle(1);
            }}
            mousePos={mousePos}
            circle={circles[1]}
          />
          <ButtonCircle
            onClick={() => {
              history.push("/elevator/1");
              setActiveCircle(2);
            }}
            mousePos={mousePos}
            circle={circles[2]}
          />
          <ButtonCircle
            onClick={() => {
              history.push("/elevator/0");
              setActiveCircle(3);
            }}
            mousePos={mousePos}
            circle={circles[3]}
          />
        </Layer>
        <Layer zIndex={2}>
          {/* top lines */}
          <Line
            points={[
              points[0].x,
              points[0].y + windowTopMargin,
              points[1].x,
              points[1].y + windowTopMargin
            ]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[
              points[2].x,
              points[2].y + windowTopMargin,
              points[3].x,
              points[3].y + windowTopMargin
            ]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[
              points[0].x,
              points[0].y + windowTopMargin,
              points[2].x,
              points[2].y + windowTopMargin
            ]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[
              points[1].x,
              points[1].y + windowTopMargin,
              points[3].x,
              points[3].y + windowTopMargin
            ]}
            stroke="black"
            strokeWidth={3}
          />

          {/* vertical lines */}
          <Line
            points={[
              points[2].x,
              points[2].y + windowTopMargin,
              points[4].x,
              points[4].y + windowTopMargin
            ]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[
              points[3].x,
              points[3].y + windowTopMargin,
              points[5].x,
              points[5].y + windowTopMargin
            ]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[
              points[0].x,
              points[0].y + windowTopMargin,
              points[6].x,
              points[6].y + windowTopMargin
            ]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[
              points[1].x,
              points[1].y + windowTopMargin,
              points[7].x,
              points[7].y + windowTopMargin
            ]}
            stroke="black"
            strokeWidth={3}
          />

          {/* bottom lines */}
          <Line
            points={[
              points[6].x,
              points[6].y + windowTopMargin,
              points[7].x,
              points[7].y + windowTopMargin
            ]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[
              points[4].x,
              points[4].y + windowTopMargin,
              points[5].x,
              points[5].y + windowTopMargin
            ]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[
              points[4].x,
              points[4].y + windowTopMargin,
              points[6].x,
              points[6].y + windowTopMargin
            ]}
            stroke="black"
            strokeWidth={3}
          />
          <Line
            points={[
              points[5].x,
              points[5].y + windowTopMargin,
              points[7].x,
              points[7].y + windowTopMargin
            ]}
            stroke="black"
            strokeWidth={3}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Elevator;
