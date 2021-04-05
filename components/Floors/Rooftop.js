import React from "react";
import Konva from "konva";
import { Stage, Layer, Image } from "react-konva";

import CanvasImage from "../ui/CanvasImage";
import * as boids from "../utils/boids";

class Rooftop extends React.Component {
  state = {
    img1_X: 0,
    img2_X: 0,
    viewAngle: 0,
    velX: 0,
    height: 0,
    width: 0,
    mousePos: { x: 0, y: 0 },
    birds: []
  };

  interval = 1000;
  numberOfBirds = 10;

  componentDidMount() {
    window.addEventListener("focus", this.onWindowFocus);
    this.loadImage();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
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

    //INITIALIZE BIRDS
    var birds = [];
    for (var i = 0; i < this.numberOfBirds; i++) {
      birds[i] = {
        posX: boids.random(this.state.width),
        posY: boids.random(window.innerHeight * 0.6),
        size: boids.randomBetween(23, 40),
        interval: boids.randomBetween(400, 800),
        direction: 1
      };
    }
    this.setState({ birds });

    this.anim.start();
    this.timerID = setInterval(() => this.tick(), 300);
  };

  tick() {
    for (var i = 0; i < this.numberOfBirds; i++) {
      /*this.state.birds[i] = {
      }*/
    }
  }

  mouseMoved = (e) => {
    const centerX = window.innerWidth / 2;
    let vel = Math.abs(e.pageX - centerX) / 400;
    if (vel > 2) {
      vel = 2;
    }
    if (e.pageX < centerX) {
      //nothing to do
    } else if (e.pageX > centerX) {
      vel = -vel;
    } else {
      vel = 0;
    }

    this.setState({ velX: vel });
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
            {this.state.birds.map((name, i) => (
              <CanvasImage
                key={i}
                src="/images/rooftop/bird"
                x={this.state.birds[i].posX + this.state.viewAngle}
                y={this.state.birds[i].posY}
                width={this.state.birds[i].size}
                interval={this.state.birds[i].interval}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default Rooftop;
