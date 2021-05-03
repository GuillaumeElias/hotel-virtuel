import React from "react";

import Konva from "konva";
import { Stage, Layer } from "react-konva";
import CanvasImage from "../ui/CanvasImage";
import ScrollTop from "../utils/ScrollTop.js";
import UrlImg from "../ui/UrlImg.js";

import { windowWidth, windowLeftMargin } from "../utils/screen.js";

class Room302 extends React.Component {
  layer = null;
  gravity = 2;
  velX = 1;
  velY = 0;
  inAir = true;
  decisionCounter = 1000;

  constructor(props) {
    super(props);
    this.state = {
      manX: 0,
      manY: 0,
      birdPosX: 0
    };
  }

  componentDidMount() {
    this.anim = new Konva.Animation((frame) => {
      let newY = this.state.manY + this.velY + this.gravity;

      if (newY + this.imgRef.state.height >= window.innerHeight) {
        newY = this.state.manY;
        this.inAir = false;
      } else {
        if (this.velY < 0) {
          this.velY += 0.007 * frame.timeDiff;
        }

        this.inAir = true;
      }

      let newX = this.state.manX + this.velX;

      if (newX + this.imgRef.state.width > windowWidth || newX < 0) {
        newX = this.state.manX;
      }

      this.setState({
        manX: newX,
        manY: newY
      });

      this.decisionCounter -= frame.timeDiff;
      if (this.decisionCounter <= 0) {
        this.velX = Math.random() * 6 - 3;

        this.setState({ birdPosX: Math.random() * 15 });

        this.decisionCounter = 1000;
      }
    }, this.layer);

    this.anim.start();
  }
  componentWillUnmount() {
    this.anim.stop();
  }

  onClick = () => {
    if (!this.inAir) {
      this.velY = -7;
    }
  };

  render() {
    return (
      <div onMouseDown={this.onClick}>
        <ScrollTop />
        <Stage width={windowWidth} height={window.innerHeight}>
          <Layer ref={(node) => (this.layer = node)}>
            <UrlImg
              key="window"
              id="window"
              x={windowWidth * 0.3}
              y={windowWidth * 0.1}
              opacity={0.8}
              src="/images/floor1/roomobjects/window.png"
              scaleX={0.5}
              scaleY={0.5}
            />

            <CanvasImage
              src="/images/rooftop/bird"
              x={windowWidth * 0.4 + this.state.birdPosX}
              y={windowWidth * 0.2}
              interval={1000}
              width={20}
            />

            <UrlImg
              key="door"
              id="door"
              ref={(r) => (this.doorRef = r)}
              x={windowWidth * 0.7}
              y={window.innerHeight - windowWidth / 3}
              opacity={0.8}
              src="/images/floor1/roomobjects/door.png"
              scaleX={0.4}
              scaleY={0.4}
              onMouseEnter={(e) => {
                let imageHover = new window.Image();
                imageHover.src = "/images/floor1/roomobjects/door_hover.png";
                imageHover.addEventListener("load", () => {
                  if (this.doorRef) {
                    this.doorRef.setState({ image: imageHover });
                  }
                });
              }}
              onMouseLeave={(e) => {
                this.doorRef.reloadImage();
              }}
              onClick={(e) => this.props.history.push("/floor/3")}
            />

            <CanvasImage
              ref={(node) => (this.imgRef = node)}
              src="/images/lobby/man"
              x={this.state.manX}
              y={this.state.manY}
              interval={100}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default Room302;
