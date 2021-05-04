import React from "react";
import { Stage, Layer } from "react-konva";
import UrlImg from "../ui/UrlImg";

import CanvasImage from "../ui/CanvasImage";

import { windowWidth } from "../utils/screen.js";
import { SoundPlayer } from "../sound/SoundPlayer";

function generateObjects() {
  return [...Array(5)].map((_, i) => ({
    id: i.toString(),
    x: (Math.random() * windowWidth) / 2,
    y: (Math.random() * window.innerHeight) / 2,
    isDragging: false,
    src: `/images/floor1/roomobjects/${i}.png`
  }));
}

const INITIAL_STATE = generateObjects();
let birdGoingRight = true;

const Room101 = ({ history }) => {
  const [objects, setObjects] = React.useState(INITIAL_STATE);
  const [birdPosX, setBirdPosX] = React.useState(0);

  const moveBird = () => {
    if (birdPosX === 60) {
      birdGoingRight = false;
    } else if (birdPosX === 0) {
      birdGoingRight = true;
    }

    if (birdGoingRight) {
      setBirdPosX(birdPosX + 5);
    } else {
      setBirdPosX(birdPosX - 5);
    }
  };

  const handleDragStart = (e) => {
    SoundPlayer.playSound("/sounds/voidClick.mp3");

    const id = e.target.id();
    setObjects(
      objects.map((img) => {
        return {
          ...img,
          isDragging: img.id === id
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    SoundPlayer.playSound("/sounds/dragEnd.mp3");

    setObjects(
      objects.map((img) => {
        return {
          ...img,
          isDragging: false
        };
      })
    );
    moveBird();
  };

  const doorRef = React.useRef();

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <UrlImg
          key="window"
          id="window"
          x={windowWidth * 0.3}
          y={windowWidth * 0.1}
          opacity={0.8}
          src="/images/floor1/roomobjects/window.png"
          scaleX={0.5}
          scaleY={0.5}
        />

        <CanvasImage
          src="/images/rooftop/bird"
          x={windowWidth * 0.4 + birdPosX}
          y={windowWidth * 0.2}
          interval={1000}
          width={20}
        />

        <UrlImg
          key="door"
          id="door"
          ref={doorRef}
          x={windowWidth * 0.7}
          y={window.innerHeight - windowWidth / 3}
          opacity={0.8}
          src="/images/floor1/roomobjects/door.png"
          scaleX={0.4}
          scaleY={0.4}
          onMouseEnter={(e) => {
            SoundPlayer.playSound("/sounds/hover.mp3");

            let imageHover = new window.Image();
            imageHover.src = "/images/floor1/roomobjects/door_hover.png";
            imageHover.addEventListener("load", () => {
              if (doorRef.current) {
                doorRef.current.setState({ image: imageHover });
              }
            });
          }}
          onMouseLeave={(e) => {
            doorRef.current.reloadImage();
          }}
          onClick={(e) => {
            SoundPlayer.playSound("/sounds/click.mp3");
            history.push("/floor/1");
          }}
        />

        {objects.map((img) => (
          <UrlImg
            key={img.id}
            id={img.id}
            x={img.x}
            y={img.y}
            opacity={0.8}
            draggable
            src={img.src}
            scaleX={img.isDragging ? 0.42 : 0.4}
            scaleY={img.isDragging ? 0.42 : 0.4}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Room101;
