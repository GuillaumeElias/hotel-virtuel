import React from "react";
import { Stage, Layer } from "react-konva";

import CanvasImage from "../ui/CanvasImage";
import ScrollTop from "../utils/ScrollTop.js";

import { windowWidth } from "../utils/screen.js";
import { VoicePlayer } from "../sound/VoicePlayer";

const Floor3 = ({ history }) => (
  <div>
    <ScrollTop />
    <Stage width={windowWidth} height={windowWidth * 0.8}>
      <Layer>
        <CanvasImage
          src="/images/floor2/room201"
          x={windowWidth / 8}
          y={0}
          width={windowWidth * 0.25}
        />

        <CanvasImage
          src="/images/floor2/room202"
          x={windowWidth / 2}
          y={0}
          width={windowWidth * 0.25}
        />

        <CanvasImage
          src="/images/elevator"
          x={windowWidth / 8}
          y={windowWidth * 0.34}
          width={windowWidth * 0.18}
          onClick={() => {
            history.push("/elevator/2");
          }}
        />

        <CanvasImage
          src="/images/floor2/janitor"
          x={windowWidth / 2}
          y={windowWidth * 0.34}
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
