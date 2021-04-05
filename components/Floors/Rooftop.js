import React from "react";
import Konva from "konva";
import { Stage, Layer, Image } from "react-konva";

import CanvasImage from "../ui/CanvasImage";
import ScrollTop from "../utils/ScrollTop.js";

class Rooftop extends React.Component {
  state = {
    img1_X: 0,
    img2_X: 0,
    viewAngle: 0,
    velX: 0,
    height: 0,
    width: 0
  };

  interval = 1000;

  componentDidMount() {
    window.addEventListener("focus", this.onWindowFocus);
    this.loadImage();
  }

  componentWillUnmount() {
    this.anim.stop();
  }

  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = "/images/rooftop/rooftop.png";
    this.image.addEventListener("load", this.handleLoad);
  }

  handleLoad = () => {
    //COMPUTE WIDTH & HEIGHT
    let height = window.innerHeight * 0.95;
    let ratio = height / this.image.height;

    let width = this.image.width * ratio;
    this.setState({
      height,
      width
    });

    //START ANIMATION
    this.anim = new Konva.Animation((frame) => {
      let viewAngle =
        this.state.viewAngle + this.state.velX * (frame.timeDiff / 5);

      viewAngle = viewAngle % this.state.width;

      let image1X = viewAngle;
      let image2X = viewAngle % this.state.width;

      if (image1X > 0) {
        image2X -= this.state.width;
      } else {
        image2X += this.state.width;
      }

      this.setState({
        img1_X: image1X,
        img2_X: image2X,
        viewAngle: viewAngle
      });
    });

    this.anim.start();
  };

  mouseMoved = (e) => {
    const centerX = window.innerWidth / 2;
    let vel = Math.abs(e.pageX - centerX) / 200;
    if (vel > 2) {
      vel = 2;
    }
    if (e.pageX < centerX) {
      this.setState({ velX: vel });
    } else if (e.pageX > centerX) {
      this.setState({ velX: -vel });
    } else {
      this.setState({ velX: 0 });
    }
  };

  onWindowFocus() {}

  render() {
    return (
      <div onMouseMove={this.mouseMoved}>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Image
              image={this.image}
              x={this.state.img1_X}
              height={this.state.height}
              width={this.state.width}
            />
            <Image
              image={this.image}
              x={this.state.img2_X}
              height={this.state.height}
              width={this.state.width}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default Rooftop;
