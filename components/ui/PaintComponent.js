import React from "react";
import { Stage, Layer, Line } from "react-konva";

const PaintComponent = ({ x, y, width, height }) => {
  const [tool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);

  const isDrawing = React.useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];

    if (lastLine) {
      lastLine.points = lastLine.points.concat([point.x, point.y]);
    }

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const clear = () => {
    setLines([]);
  };

  return (
    <div>
      <Stage
        width={width - 20}
        height={height}
        x={x}
        y={y}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onMouseEnter={(e) => {
          // style stage container:
          const container = e.target.getStage().container();
          container.style.cursor = "crosshair";
        }}
        onMouseLeave={(e) => {
          const container = e.target.getStage().container();
          container.style.cursor = "default";
        }}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line && line.points}
              stroke="#000000"
              strokeWidth={4}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>

      <img
        style={{ position: "relative", left: width + "px", top: -20 }}
        alt="clear"
        src="images/frontdesk/bin.png"
        width={20}
        onClick={clear}
      />
    </div>
  );
};

export default PaintComponent;
