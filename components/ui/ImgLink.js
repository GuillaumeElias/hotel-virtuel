import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }

  img:hover {
    background-color: #c37500;
    opacity: 0.7 !important;
    filter: alpha(opacity=70) !important; /* For IE8 and earlier */
    box-shadow: 0 0 0px #000000 !important;
  }
`;

class ImgLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imgSrc: this.props.src + "_0.png", frameNb: 0 };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    let newFrameNb =
      this.state.frameNb >= this.props.nbFrames - 1
        ? 0
        : this.state.frameNb + 1;

    this.setState({
      frameNb: newFrameNb,
      imgSrc: `${this.props.src}_${newFrameNb}.png`
    });
  }

  render() {
    return (
      <StyledImgLink>
        <div className="imgWrapper">
          <Link to={this.props.to} background="">
            <img src={this.state.imgSrc} style={this.props.style} />
          </Link>
        </div>
      </StyledImgLink>
    );
  }
}

ImgLink.defaultProps = {
  nbFrames: 2
};

export default ImgLink;
