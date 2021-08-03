import React from "react";
import { Stage, Layer } from "react-konva";

import CanvasImage from "./ui/CanvasImage";
import ScrollTop from "./utils/ScrollTop.js";
import BackButton from "./ui/BackButton";

import { windowTopMargin, windowWidth, computeElementY } from "./utils/screen.js";

import { VoicePlayer } from "./sound/VoicePlayer";

const Lobby = ({ history }) => {

  return (
    <div style={{overflowY: 'hidden'}}>
      <ScrollTop />
      <Stage
        width={windowWidth}
        height={window.innerHeight - 40 - windowTopMargin}
      >
        <Layer>
          <CanvasImage
            src="/images/lobby/bar"
            x={windowWidth / 8}
            y={computeElementY(1352, 662, windowWidth / 1.5, 1)}
            width={windowWidth / 1.5}
            onClick={() => {
              VoicePlayer.playVoice("/voice/bar.mp3");
              history.push("/bar");
            }}
          />
          <CanvasImage
            src="/images/lobby/manandplant"
            x={windowWidth / 20}
            y={computeElementY(171, 130, windowWidth / 4.2, 3)}
            width={windowWidth / 4.2}
            onClick={() => {
              VoicePlayer.playVoice("/voice/hommeSeul.mp3");
              history.push("/manandplant");
            }}
          />
          <CanvasImage
            src="/images/lobby/plant"
            x={windowWidth / 2.5}
            y={computeElementY(223, 142, windowWidth / 3, 3)}
            width={windowWidth / 3}
            onClick={() => {
              VoicePlayer.playVoice("/voice/arrosoir.mp3");
              history.push("/plant");
            }}
          />
        </Layer>
      </Stage>
      <BackButton path="/reception" history={history} />
    </div>
  );
};

export default Lobby;
