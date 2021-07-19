import React from "react";
import { Stage, Layer } from "react-konva";

import CanvasImage from "../ui/CanvasImage";
import ScrollTop from "../utils/ScrollTop.js";

import { windowWidth, windowHeight, computeElementY, computeElementX } from "../utils/screen.js";
import { VoicePlayer } from "../sound/VoicePlayer";

const Floor1 = ({ history }) => (
  <div>
    <ScrollTop />
    <Stage width={windowWidth} height={windowHeight}>
      <Layer>
        <CanvasImage
          src="/images/floor1/room101"
          x={computeElementX(windowWidth * 0.3, 1)}
          y={computeElementY(742, 1040, windowWidth * 0.3, 1)}
          width={windowWidth * 0.3}
          onClick={() => {
            VoicePlayer.playVoice("/voice/chambre.mp3");
            history.push("/room/101");
          }}
        />

        <CanvasImage
          src="/images/floor1/room102"
          x={computeElementX(windowWidth * 0.3, 3)}
          y={computeElementY(742, 1040, windowWidth * 0.3, 1)}
          width={windowWidth * 0.3}
        />

        <CanvasImage
          src="/images/elevator"
          x={computeElementX(windowWidth * 0.2, 1)}
          y={computeElementY(544, 502, windowWidth * 0.2, 3)}
          width={windowWidth * 0.2}
          onClick={() => {
            VoicePlayer.playVoice("/voice/cageMetallique.mp3");
            history.push("/elevator/1");
          }}
        />
        <CanvasImage
          src="/images/escalator"
          x={computeElementX(windowWidth * 0.3, 3)}
          y={computeElementY(609, 456, windowWidth * 0.3, 3)}
          width={windowWidth * 0.3}
          onClick={() => {
            VoicePlayer.playVoice("/voice/escalierMagnetique.mp3");
            history.push("/escalator/1");
          }}
        />
      </Layer>
    </Stage>
  </div>
);

export default Floor1;
