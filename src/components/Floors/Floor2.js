import React from "react";
import { Stage, Layer } from "react-konva";

import CanvasImage from "../ui/CanvasImage";
import ScrollTop from "../utils/ScrollTop.js";

import { windowWidth, computeElementY, windowHeight } from "../utils/screen.js";
import { VoicePlayer } from "../sound/VoicePlayer";

const Floor3 = ({ history }) => (
  <div>
    <ScrollTop />
    <Stage width={windowWidth} height={windowHeight}>
      <Layer>
        <CanvasImage
          src="/images/floor2/room201"
          x={windowWidth / 8}
          y={computeElementY(834, 1040, windowWidth * 0.25, 1)}
          width={windowWidth * 0.25}
        />

        <CanvasImage
          src="/images/floor2/room202"
          x={windowWidth / 2}
          y={computeElementY(834, 1040, windowWidth * 0.25, 1)}
          width={windowWidth * 0.25}
        />

        <CanvasImage
          src="/images/elevator"
          x={windowWidth / 8}
          y={computeElementY(544, 502, windowWidth * 0.18, 3)}
          width={windowWidth * 0.18}
          onClick={() => {
            history.push("/elevator/2");
          }}
        />

        <CanvasImage
          src="/images/floor2/janitor"
          x={windowWidth / 2}
          y={computeElementY(612, 1006, windowWidth * 0.18, 3)}
          width={windowWidth * 0.18}
          onClick={() => {
            VoicePlayer.playVoice("/voice/sortezDIci.mp3");
            history.push("/room/janitor");
          }}
        />
      </Layer>
    </Stage>
  </div>
);

export default Floor3;
