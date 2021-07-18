import React from "react";

import { Stage, Layer } from "react-konva";
import CanvasImage from "./ui/CanvasImage";
import ScrollTop from "./utils/ScrollTop.js";

import {
  windowWidth,
  windowLeftMargin,
  windowTopMargin,
  computeElementY
} from "./utils/screen.js";
import { MusicPlayer } from "./sound/MusicPlayer";
import { VoicePlayer } from "./sound/VoicePlayer";

const Reception = ({ history }) => {
  const [addX, setAddX] = React.useState(0);
  const [addY, setAddY] = React.useState(0);

  const handleMouseMove = (e) => {
    setAddX((e.pageX - windowLeftMargin) / 30);
    setAddY(e.pageY / 30);
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <ScrollTop />
      <Stage
        width={windowWidth}
        height={window.innerHeight * 1.5 - windowTopMargin}
      >
        <Layer>
          <CanvasImage
            src="/images/frontdesk"
            x={0 + addX}
            y={computeElementY(446, 313, windowWidth / 3, 1) + addY}
            width={windowWidth / 3}
            onClick={() => {
              history.push("/frontdesk");
            }}
          />
          <CanvasImage
            src="/images/lobby"
            x={windowWidth / 2 + addX / 3}
            y={computeElementY(544, 502, windowWidth / 3, 1) + addY}
            width={windowWidth / 3}
            onClick={() => {
              history.push("/lobby");
            }}
          />
          <CanvasImage
            src="/images/elevator"
            x={10 + addX / 3}
            y={computeElementY(544, 502, windowWidth / 3, 3) + addY}
            width={windowWidth / 4}
            onClick={() => {
              VoicePlayer.playVoice("/voice/cageMetallique.mp3");
              history.push("/elevator/0");
            }}
          />
          <CanvasImage
            src="/images/escalator"
            x={windowWidth / 2 + addX / 2}
            y={computeElementY(544, 502, windowWidth / 3, 3) + addY}
            width={windowWidth / 3.2}
            onClick={() => {
              VoicePlayer.playVoice("/voice/escalierMagnetique.mp3");
              history.push("/escalator/0");
            }}
          />
          <CanvasImage
            src="/images/exit"
            x={10}
            y={window.innerHeight}
            width={windowWidth / 6}
            onClick={() => {
              history.push("/");
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Reception;
