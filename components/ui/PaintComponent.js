import React from "react";
import { Stage, Layer, Line } from "react-konva";

const PaintComponent = ({
  x,
  y,
  width,
  height,
  lines,
  onChange,
  onImageBuilt,
  hideClear,
  strokeColor,
  strokeWidth,
  cursor,
  children
}) => {
  const [tool] = React.useState("pen");
  let stageRef = React.useRef();

  const setLines = (lines) => {
    onChange(lines);
  };

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
    if (!!onImageBuilt) {
      buildImage();
    }
  };

  const clear = () => {
    setLines([]);
  };

  const buildImage = () => {
    if (stageRef.current == null) {
      console.warn("stage is null");
      return null;
    }
    return stageRef.current.toDataURL({
      mimeType: "image/png",
      quality: 0.1,
      pixelRatio: 0.2,
      callback: onImageBuilt
    });
  };

  return (
    <div>
      <Stage
        ref={stageRef}
        width={width - 20}
        height={height}
        x={x}
        y={y}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onMouseEnter={(e) => {
          if (cursor) {
            // style stage container:
            const container = e.target.getStage().container();
            container.style.cursor = cursor;
          }
        }}
        onMouseLeave={(e) => {
          if (cursor) {
            const container = e.target.getStage().container();
            container.style.cursor = "default";
          }
        }}
      >
        <Layer>
          {children}
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line && line.points}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation="source-over"
            />
          ))}
        </Layer>
      </Stage>

      {!hideClear && (
        <img
          style={{ position: "relative", left: width + "px", top: -20 }}
          alt="clear"
          src="images/frontdesk/bin.png"
          width={20}
          onClick={clear}
        />
      )}
    </div>
  );
};

PaintComponent.defaultProps = {
  hideClear: false,
  strokeColor: "#000000",
  strokeWidth: 4,
  cursor: "crosshair"
};

export default PaintComponent;
