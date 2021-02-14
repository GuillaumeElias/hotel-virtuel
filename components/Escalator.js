import React from "react";

import Konva from "konva";
import { Link } from "react-router-dom";
import CanvasImage from "./ui/CanvasImage.js";

import { Stage, Layer } from "react-konva";

import { windowWidth, windowLeftMargin } from "./utils/screen.js";

class Escalator extends React.Component {
  aimedPosX = 0;

  constructor(props) {
    super(props);

    const { match, history } = props;

    const floorNb = match.params.floorNb;
    const nextFloorNb = parseInt(floorNb) + 1;

    this.state = {
      characterX: windowWidth * 0.1,
      characterY: windowWidth * 0.42
    };

    this.aimedPosX = this.state.characterX;
    this.aimedPosY = this.state.characterY;
  }

  componentDidMount() {
    this.anim = new Konva.Animation((frame) => {
      let deltaX = this.aimedPosX - this.state.characterX;

      if (
        (deltaX > 2 && this.state.characterX < this.aimedPosX) ||
        (deltaX < 2 && this.state.characterX > this.aimedPosX)
      ) {
        let ratio = 0.69;
        if (
          this.state.characterX < windowWidth * 0.2 ||
          this.state.characterX > windowWidth * 0.8
        ) {
          ratio = 0;
        }

        let incX = Math.sign(deltaX) * 1;
        let incY = -incX * ratio;

        let newX = this.state.characterX + (incX * frame.timeDiff) / 10;
        let newY = this.state.characterY + (incY * frame.timeDiff) / 10;

        this.setState({
          characterX: newX,
          characterY: newY
        });
      }
    });
    this.anim.start();
  }

  onMouseDown = (e) => {
    this.aimedPosX = e.pageX - windowLeftMargin - windowWidth / 30;
  };

  render() {
    return (
      <div onMouseDown={this.onMouseDown}>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <CanvasImage
              x={windowWidth * 0.1}
              y={0}
              width={windowWidth * 0.8}
              src="/images/escalator"
            />

            <CanvasImage
              x={this.state.characterX}
              y={this.state.characterY}
              width={windowWidth / 15}
              src="/images/escalator/character"
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default Escalator;
