import React from "react";
import { Stage, Layer } from "react-konva";
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
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onMouseEnter={(e) => {
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
          onClick={(e) => history.push("/floor/1")}
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
