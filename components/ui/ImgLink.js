import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SoundPlayer } from "../sound/SoundPlayer";
import Img from "./Img";

const StyledImgLink = styled.div`
  display: block;
  width: -webkit-fit-content;
  height: -webkit-fit-content;
  width: -moz-fit-content;
  height: -moz-fit-content;
  margin-left: auto;
  margin-right: auto;

  .imgWrapper {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  img:hover {
    background-color: #c37500;
    opacity: 0.7 !important;
    filter: alpha(opacity=70) !important; /* For IE8 and earlier */
    box-shadow: 0 0 0px #000000 !important;
  }
`;

const ImgLink = ({
  width,
  to,
  src,
  onClick,
  onMouseEnter,
  onMouseLeave,
  silent
}) => {
  const linkClicked = () => {
    if (!silent) {
      SoundPlayer.playSound("/sounds/click.mp3");
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledImgLink>
      <div
        className="imgWrapper"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Link to={to} background="" onClick={linkClicked}>
          <Img src={src} width={width} />
        </Link>
      </div>
    </StyledImgLink>
  );
};

ImgLink.defaultProps = {
  nbFrames: 2,
  silent: false
};

export default ImgLink;
