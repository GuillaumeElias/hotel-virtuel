import React from "react";
import ImageMapper from "react-image-mapper";
import Konva from "konva";

import { useGlobalState } from "./utils/GlobalState";
import styled from "styled-components";

import BackButton from "./ui/BackButton";

import { windowWidth } from "./utils/screen.js";
import { SoundPlayer } from "./sound/SoundPlayer";
import { VoicePlayer } from "./sound/VoicePlayer";
import { Synth } from "./sound/Synth";

const imgY = windowWidth / 5;
const imgX = windowWidth * 0.2;
const imgWidth = windowWidth * 0.08;

const StyledDiv = styled.div`
  img.drawnImage {
    position: absolute;
    width: ${imgWidth}px;
    left: ${imgX}px;
    top: ${imgY}px;
    z-index: 2;
  }
  div.backToReception {
    width: 50%;
  }

  overflow: hidden;
`;

const FrontDesk = ({ history }) => {
  const [state] = useGlobalState();
  const imageMapper = React.useRef();
  const [imgRatio, setImgRatio] = React.useState(0.1);
  const [hoveredCatImage, setHoveredCatImage] = React.useState(false);

  React.useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      if (imgRatio > 1) {
        anim.stop();
      } else {
        setImgRatio(imgRatio + frame.timeDiff / 2000);
      }
    });

    anim.start();

    return () => {
      anim.stop();
    };
  });

  if (state.registered) {
    const catImage = state.catImage;

    const computeArea = (e) => {
      let area = imageMapper.current.state.map.areas[0];
      return area;
    };

    return (
      <StyledDiv>
        <ImageMapper
          ref={imageMapper}
          width={windowWidth / 2}
          imgWidth={446}
          src="images/frontdesk/frontdeskguy_registered.png"
          onClick={(e) => {
            if (e.coords[0] === 384) {
              Synth.playShortNote();
            } else {
              SoundPlayer.playSound("/sounds/click.mp3");
              history.push("/registration");
            }
          }}
          map={{
            name: "register",
            areas: [
              { href: "#", coords: [252, 243, 173, 142], shape: "rect" },
              { href: "#", coords: [384, 175, 329, 146], shape: "rect" }
            ]
          }}
          onMouseEnter={(e) => { if(e.coords[0] == 252) setHoveredCatImage(true) }}
          onMouseLeave={(e) => { if(e.coords[0] == 252) console.log(e); setHoveredCatImage(false) }}
        />
        <img
          alt=""
          className="drawnImage"
          src={catImage}
          onClick={() => {
            SoundPlayer.playSound("/sounds/click.mp3");
            history.push("/registration");
          }}
          style={{ cursor: "pointer" , opacity: hoveredCatImage ? 0.5 : 1}}
          onMouseEnter={(e) => {
            if (imageMapper.current) {
              let area = computeArea(e);
              imageMapper.current.hoverOn(area, 0, e.nativeEvent);
            }
          }}
          onMouseLeave={(e) => {
            if (imageMapper.current) {
              let area = computeArea(e);
              imageMapper.current.hoverOff(area, 0, e.nativeEvent);
            }
          }}
        />
        <br />
        <div className="backToReception">
          <BackButton path="/reception" history={history} />
        </div>
      </StyledDiv>
    );
  }

  return (
    <div style={{overflow: 'hidden'}} >
      <ImageMapper
        width={windowWidth * imgRatio}
        imgWidth={446}
        src="images/frontdesk/frontdeskguy.png"
        onClick={(e) => {
          if (e.coords[0] === 384) {
            Synth.playShortNote();
          } else {
            SoundPlayer.playSound("/sounds/click.mp3");
            VoicePlayer.playVoice("/voice/felin.mp3");
            history.push("/registration");
          }
        }}
        map={{
          name: "register",
          areas: [
            { href: "#", coords: [63, 62, 143, 167], shape: "rect" },
            { href: "#", coords: [384, 175, 329, 146], shape: "rect" }
          ]
        }}
      />
    </div>
  );
};

export default FrontDesk;
