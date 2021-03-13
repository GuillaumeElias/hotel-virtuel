import React from "react";
import { Stage, Layer, Image } from "react-konva";
import UrlImg from "../ui/UrlImg";

import { windowWidth } from "../utils/screen.js";

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

const Room101 = ({ history }) => {
  const [objects, setObjects] = React.useState(INITIAL_STATE);

  const handleDragStart = (e) => {
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
    setObjects(
      objects.map((img) => {
        return {
          ...img,
          isDragging: false
        };
      })
    );
  };

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
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
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
