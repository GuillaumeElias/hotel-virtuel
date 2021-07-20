import React from "react";

import { Stage, Layer, Star } from "react-konva";
import CanvasImage from "./ui/CanvasImage";
import ScrollTop from "./utils/ScrollTop.js";

import {
  windowWidth,
  windowLeftMargin,
  windowTopMargin,
  computeElementY,
  computeElementX
} from "./utils/screen.js";
import { MusicPlayer } from "./sound/MusicPlayer";
import { VoicePlayer } from "./sound/VoicePlayer";
import { Synth } from "./sound/Synth";

const Reception = ({ history }) => {
  const [addX, setAddX] = React.useState(0);
  const [addY, setAddY] = React.useState(0);

  const [stars, setStars] = React.useState([]);

  const handleMouseMove = (e) => {
    setAddX((e.pageX - windowLeftMargin) / 30);
    setAddY((e.pageY - windowTopMargin ) / 30);
  };

  const addStar = (e) => {
    const newStars = [...stars];
    newStars.push({
      id: newStars.length,
      x: e.pageX - windowLeftMargin - addX + 6,
      y: e.pageY - windowTopMargin - addY - 6,
      rotation: Math.random() * 360
    })
    setStars(newStars);
    Synth.playVeryShortNote(newStars.length);
  }

  return (
    <div onMouseMove={handleMouseMove} onMouseUp={addStar}>
      <ScrollTop />
      <Stage
        width={windowWidth}
        height={window.innerHeight * 1.5 - windowTopMargin}
      >
        <Layer>
          <CanvasImage
            src="/images/frontdesk"
            x={computeElementX(windowWidth / 3, 1) + addX}
            y={computeElementY(446, 313, windowWidth / 3, 1) + addY}
            width={windowWidth / 3}
            onClick={() => {
              history.push("/frontdesk");
            }}
          />
          <CanvasImage
            src="/images/lobby"
            x={computeElementX(windowWidth / 3, 3) + addX}
            y={computeElementY(544, 502, windowWidth / 3, 1) + addY}
            width={windowWidth / 3}
            onClick={() => {
              history.push("/lobby");
            }}
          />
          <CanvasImage
            src="/images/elevator"
            x={computeElementX(windowWidth / 4, 1) + addX}
            y={computeElementY(544, 502, windowWidth / 4, 3) + addY}
            width={windowWidth / 4}
            onClick={() => {
              VoicePlayer.playVoice("/voice/cageMetallique.mp3");
              history.push("/elevator/0");
            }}
          />
          <CanvasImage
            src="/images/escalator"
            x={computeElementX(windowWidth / 3.2, 3) + addX}
            y={computeElementY(544, 502, windowWidth / 3.2, 3) + addY}
            width={windowWidth / 3.2}
            onClick={() => {
              VoicePlayer.playVoice("/voice/escalierMagnetique.mp3");
              history.push("/escalator/0");
            }}
          />
          <CanvasImage
            src="/images/exit"
            x={computeElementX(windowWidth / 6, 1) + addX}
            y={window.innerHeight}
            width={windowWidth / 6}
            onClick={() => {
              history.push("/");
            }}
          />
          {stars.map((star) => (
            <Star
              key={star.id}
              id={star.id}
              x={star.x + addX}
              y={star.y + addY}
              numPoints={3}
              innerRadius={2}
              outerRadius={4}
              fill="#000000"
              opacity={0.7}
              rotation={star.rotation}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Reception;
