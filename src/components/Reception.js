import React from "react";

import { Stage, Layer } from "react-konva";
import CanvasImage from "./ui/CanvasImage";
import ScrollTop from "./utils/ScrollTop.js";

import {
  windowWidth,
  windowLeftMargin,
  windowTopMargin,
  computeElementY,
  computeElementX
} from "./utils/screen.js";
import { VoicePlayer } from "./sound/VoicePlayer";

const Reception = ({ history }) => {
  const [addX, setAddX] = React.useState(0.0);

  const aimX = React.useRef();
  const anim = React.useRef()
  const prevTime = React.useRef();

  const animate = time => {

    if (prevTime.current == undefined) {
      prevTime.current = time;
    }

    const timeDiff = time - prevTime.current;

    if(aimX.current != null){
      let deltaX = aimX.current - addX;
      let valX = addX + Math.sign(deltaX) * (timeDiff / 30.0);

      if  ((deltaX > 0 && valX >= aimX.current) 
        || (deltaX < 0 && valX <= aimX.current)){
        aimX.current = null;
      }else{
        setAddX( valX );
      }     
    }
      
    prevTime.current = time;
    anim.current = requestAnimationFrame(animate);
  }

  React.useEffect(() => {
    anim.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(anim.current);
  }, [addX, aimX, prevTime]);

  const handleMouseMove = (e) => {
    aimX.current = (e.pageX - windowLeftMargin) / 30;
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
            x={computeElementX(windowWidth / 3, 1) + addX}
            y={computeElementY(446, 313, windowWidth / 3, 1) - addX}
            width={windowWidth / 3}
            onClick={() => {
              history.push("/frontdesk");
            }}
          />
          <CanvasImage
            src="/images/lobby"
            x={computeElementX(windowWidth / 3, 3) + addX}
            y={computeElementY(544, 502, windowWidth / 3, 1)  - addX}
            width={windowWidth / 3}
            onClick={() => {
              history.push("/lobby");
            }}
          />
          <CanvasImage
            src="/images/elevator"
            x={computeElementX(windowWidth / 4, 1) + addX}
            y={computeElementY(544, 502, windowWidth / 4, 3)  - addX}
            width={windowWidth / 4}
            onClick={() => {
              VoicePlayer.playVoice("/voice/cageMetallique.mp3");
              history.push("/elevator/0");
            }}
          />
          <CanvasImage
            src="/images/escalator"
            x={computeElementX(windowWidth / 3.2, 3) + addX}
            y={computeElementY(544, 502, windowWidth / 3.2, 3)}
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
        </Layer>
      </Stage>
    </div>
  );
};

export default Reception;
