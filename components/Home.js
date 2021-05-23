import React from "react";
import ImgLink from "./ui/ImgLink";
import Konva from "konva";

import { windowWidth } from "./utils/screen.js";
import { MusicPlayer } from "./sound/MusicPlayer";

const divStyle = {
  display: "block"
};

const Home = () => {
  const [imgWidth, setImgWidth] = React.useState(0);
  const [headsetOn, setHeadsetOn] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  React.useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      if (imgWidth > windowWidth * 0.8) {
        anim.stop();
      } else if (headsetOn) {
        setImgWidth(imgWidth + frame.timeDiff / 5);
      }
    });

    anim.start();

    return () => {
      anim.stop();
    };
  }, [headsetOn, imgWidth]);

  if (!headsetOn) {
    let instrImgWidth = null;
    let instrImgHeight = window.innerHeight / 2;

    if (windowWidth < 590) {
      instrImgWidth = windowWidth;
      instrImgHeight = null;
    }

    return (
      <div>
        <img
          alt=""
          style={{ display: "block", margin: "auto" }}
          width={instrImgWidth}
          height={instrImgHeight}
          src={hover ? "/images/headset_1.png" : "/images/headset_0.png"}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        <ImgLink
          to="/"
          src="images/frontdesk/ok"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => {
            setHeadsetOn(true);
            MusicPlayer.setMusic(
              "https://hotelvirtuel.space/sound/HotelVirtuel_0.mp3"
            );
          }}
          silent
        />
      </div>
    );
  }

  return (
    <div style={divStyle}>
      <ImgLink width={imgWidth} to="/reception" src="/images/hotel" />
    </div>
  );
};

export default Home;
