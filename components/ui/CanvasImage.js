import React from "react";

import { Image } from "react-konva";

class CanvasImage extends React.Component {
  state = {
    image: null
  };
  componentDidMount() {
    this.loadImages();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImages();
    }
  }
  componentWillUnmount() {
    this.image1.removeEventListener("load", this.handleLoad);
    this.image2.removeEventListener("load", this.handleLoad);
    clearInterval(this.timerID);
  }
  loadImages() {
    // save to "this" to remove "load" handler on unmount
    this.image1 = new window.Image();
    this.image1.src = this.props.src + "_0.png";
    this.image1.addEventListener("load", this.handleLoad1);
  }

  handleLoad1 = () => {
    this.setState({
      image: this.image1
    });

    if (this.props.width) {
      let ratio = this.image1.width / parseFloat(this.image1.height);
      this.image1.width = this.props.width;
      this.image1.height = this.image1.width * ratio;
    } else {
      this.image1.width = this.image.width * (this.props.percent / 100.0);
    }

    if (this.props.height) {
      this.image1.height = this.props.height;
    } else {
      this.image1.height = this.image1.height * (this.props.percent / 100.0);
    }

    this.image2 = new window.Image();
    this.image2.src = this.props.src + "_1.png";
    this.image2.addEventListener("load", this.handleLoad2);
  };

  handleLoad2 = () => {
    this.image2.width = this.image1.width;
    this.image2.height = this.image1.height;

    this.timerID = setInterval(() => this.tick(), 1000);
  };

  tick() {
    if (this.state.image === this.image1) {
      this.setState({
        image: this.image2
      });
    } else {
      this.setState({
        image: this.image1
      });
    }
  }

  render() {
    const handleClick = () => {
      this.props.onClick();
    };

    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        image={this.state.image}
        ref={(node) => {
          this.imageNode = node;
        }}
        onClick={handleClick}
        onMouseEnter={(e) => {
          // style stage container:
          const container = e.target.getStage().container();
          container.style.cursor = "pointer";
        }}
        onMouseLeave={(e) => {
          const container = e.target.getStage().container();
          container.style.cursor = "default";
        }}
      />
    );
  }
}

CanvasImage.defaultProps = {
  percent: 100
};

export default CanvasImage;
