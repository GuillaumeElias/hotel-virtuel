import React from "react";

import { Image } from "react-konva";

class CanvasImage extends React.Component {
  state = {
    image: null
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;

    this.image.addEventListener("load", this.handleLoad);
  }

  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image
    });

    if (this.props.width) {
      let ratio = this.image.width / parseFloat(this.image.height);
      this.image.width = this.props.width;
      this.image.height = this.image.width * ratio;
    } else {
      this.image.width = this.image.width * (this.props.percent / 100.0);
    }

    if (this.props.height) {
      this.image.height = this.props.height;
    } else {
      this.image.height = this.image.height * (this.props.percent / 100.0);
    }
  };

  render() {
    const handleClick = () => {
      this.props.onClick();
    };

    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
        onClick={handleClick}
        onMouseEnter={e => {
          // style stage container:
          const container = e.target.getStage().container();
          container.style.cursor = "pointer";
        }}
        onMouseLeave={e => {
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
