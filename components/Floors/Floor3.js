import React from "react";
import { Stage, Layer } from "react-konva";

import CanvasImage from "../ui/CanvasImage";
import ScrollTop from "../utils/ScrollTop.js";

import { windowWidth } from "../utils/screen.js";
import { MusicPlayer } from "../sound/MusicPlayer";
import { VoicePlayer } from "../sound/VoicePlayer";

const Floor3 = ({ history }) => {
  const trapDoorRef = React.useRef();

  React.useEffect(() => {
    VoicePlayer.playVoice("/voice/dernierEtage.mp3");
    MusicPlayer.setPlaying(false);
  }, []);

  return (
    <div>
      <ScrollTop />
      <Stage width={windowWidth} height={windowWidth * 0.8}>
        <Layer>
          <CanvasImage
            src="/images/floor3/room301"
            x={windowWidth / 8}
            y={0}
            width={windowWidth * 0.25}
          />

          <CanvasImage
            src="/images/floor3/room302"
            x={windowWidth / 2}
            y={0}
            width={windowWidth * 0.25}
            onClick={() => {
              VoicePlayer.playVoice("/voice/chambreHomme.mp3");
              history.push("/room/302");
            }}
          />

          <CanvasImage
            src="/images/elevator"
            x={windowWidth / 8}
            y={windowWidth * 0.34}
            width={windowWidth * 0.18}
            onClick={() => {
              history.push("/elevator/3");
            }}
          />

          <CanvasImage
            ref={trapDoorRef}
            src="/images/floor3/trapdoor"
            x={windowWidth / 2}
            y={windowWidth * 0.34}
            width={windowWidth * 0.18}
            onClick={(e) => {
              MusicPlayer.setMusic(
                "https://hotelvirtuel.space/sound/OnTheRooftop.mp3"
              );

              for (let i = 1; i < 3; i += 0.1) {
                setTimeout(() => {
                  if (trapDoorRef.current) {
                    trapDoorRef.current.setState({ sizeRatio: i });
                  }
                }, i * 1000);
              }

              setTimeout(() => {
                history.push("/floor/rooftop");
              }, 3100);
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Floor3;
