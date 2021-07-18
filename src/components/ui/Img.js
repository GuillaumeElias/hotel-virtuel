import React from "react";
import styled from "styled-components";

const StyledImg = styled.div`
  display: block;
  width: -webkit-fit-content;
  height: -webkit-fit-content;
  width: -moz-fit-content;
  height: -moz-fit-content;
  margin-left: auto;
  margin-right: auto;

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }
`;

class Img extends React.Component {
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
      <StyledImg>
        <img
          alt=""
          width={this.props.width}
          src={this.state.imgSrc}
          style={this.props.style}
        />
      </StyledImg>
    );
  }
}

Img.defaultProps = {
  nbFrames: 2
};

export default Img;
