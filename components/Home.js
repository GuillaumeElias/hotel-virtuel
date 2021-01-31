import React from "react";
import ImgLink from "./ui/ImgLink";
import Konva from "konva";

import { windowWidth } from "./utils/screen.js";

const divStyle = {
  display: "block"
};

const Home = () => {
  const [imgWidth, setImgWidth] = React.useState(0);

  React.useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      if (imgWidth > windowWidth * 0.8) {
        anim.stop();
      } else {
        setImgWidth(imgWidth + frame.timeDiff / 5);
      }
    });

    anim.start();

    return () => {
      anim.stop();
    };
  });

  return (
    <div style={divStyle}>
      <ImgLink width={imgWidth} to="/reception" src="/images/hotel" />
    </div>
  );
};

export default Home;
