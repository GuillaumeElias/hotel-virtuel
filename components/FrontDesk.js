import React from "react";
import ImageMapper from "react-image-mapper";

import { useGlobalState } from "./utils/GlobalState";
import styled from "styled-components";
import ImgLink from "./ui/ImgLink";

const imgY = window.innerWidth / 5;
const imgX = window.innerWidth / 5;
const imgWidth = window.innerWidth / 10;

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
`;

const FrontDesk = ({ history }) => {
  const [state] = useGlobalState();
  const imageMapper = React.useRef();

  if (state.registered) {
    const catImage = state.catImage;

    const computeArea = (e) => {
      let area = imageMapper.current.state.map.areas[0];
      e.nativeEvent.target = area;
      return area;
    };

    return (
      <StyledDiv>
        <ImageMapper
          ref={imageMapper}
          width={window.innerWidth / 2}
          imgWidth={446}
          src="images/frontdesk/frontdeskguy_registered.png"
          onClick={() => {
            history.push("/registration");
          }}
          map={{
            name: "",
            areas: [{ href: "#", coords: [252, 243, 173, 142], shape: "rect" }]
          }}
          onMouseEnter={() => {}}
        />
        <img
          alt=""
          className="drawnImage"
          src={catImage}
          onClick={() => {
            history.push("/registration");
          }}
          style={{ cursor: "pointer" }}
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
          <ImgLink
            alt=""
            src="images/frontdesk/backToReception"
            to="/reception"
          />
        </div>
      </StyledDiv>
    );
  }

  return (
    <div>
      <ImageMapper
        width={window.innerWidth}
        imgWidth={446}
        src="images/frontdesk/frontdeskguy.png"
        onClick={() => {
          history.push("/registration");
        }}
        map={{
          name: "",
          areas: [{ href: "#", coords: [63, 62, 143, 167], shape: "rect" }]
        }}
      />
    </div>
  );
};

export default FrontDesk;
