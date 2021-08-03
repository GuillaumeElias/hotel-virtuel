import React from "react";
import { Stage, Layer, Star } from "react-konva";

import CanvasImage from "../ui/CanvasImage";
import ScrollTop from "../utils/ScrollTop.js";

import { windowWidth, computeElementY, windowHeight, computeElementX, windowLeftMargin, windowTopMargin } from "../utils/screen.js";
import { VoicePlayer } from "../sound/VoicePlayer";
import { Synth } from "../sound/Synth";

const Floor2 = ({ history }) => {

  const [stars, setStars] = React.useState([]);
  
  const addStar = (e) => {
    const newStars = [...stars];

    const colors = ["#F04654", "#C79579", "#C3EB52", "black"];
    const color = colors[newStars.length % 4];

    newStars.push({
      id: newStars.length,
      x: e.pageX - windowLeftMargin + 6,
      y: e.pageY - windowTopMargin - 6,
      rotation: Math.random() * 360,
      color: color
    })
    setStars(newStars);
    Synth.playVeryShortNote(newStars.length);
  }

  return (
  <div onClick={addStar}>
    <ScrollTop />
    <Stage width={windowWidth} height={windowHeight}>
      <Layer>
        <CanvasImage
          src="/images/floor2/room201"
          x={computeElementX(windowWidth * 0.25, 1)}
          y={computeElementY(834, 1040, windowWidth * 0.25, 1)}
          width={windowWidth * 0.25}
        />

        <CanvasImage
          src="/images/floor2/room202"
          x={computeElementX(windowWidth * 0.25, 3)}
          y={computeElementY(834, 1040, windowWidth * 0.25, 1)}
          width={windowWidth * 0.25}
        />

        <CanvasImage
          src="/images/elevator"
          x={computeElementX(windowWidth * 0.18, 1)}
          y={computeElementY(544, 502, windowWidth * 0.18, 3)}
          width={windowWidth * 0.18}
          onClick={() => {
            history.push("/elevator/2");
          }}
        />

        <CanvasImage
          src="/images/floor2/janitor"
          x={computeElementX(windowWidth * 0.18, 3)}
          y={computeElementY(612, 1006, windowWidth * 0.18, 3)}
          width={windowWidth * 0.18}
          onClick={() => {
            VoicePlayer.playVoice("/voice/sortezDIci.mp3");
            history.push("/room/janitor");
          }}
        />

        {stars.map((star) => (
            <Star
              key={star.id}
              id={star.id}
              x={star.x}
              y={star.y}
              numPoints={star.id % 5 + 3}
              innerRadius={2}
              outerRadius={4}
              fill={star.color}
              opacity={0.8}
              rotation={star.rotation}
            />
          ))}
      </Layer>
    </Stage>
  </div>
)};

export default Floor2;
