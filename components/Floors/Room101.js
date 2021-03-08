import React from "react";
import { Stage, Layer, Image } from "react-konva";
import UrlImg from "../ui/UrlImg";

function generateObjects() {
  return [...Array(5)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
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
        {objects.map((img) => (
          <UrlImg
            key={img.id}
            id={img.id}
            x={img.x}
            y={img.y}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            opacity={0.8}
            draggable
            src={img.src}
            scaleX={img.isDragging ? 1.2 : 1}
            scaleY={img.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Room101;
