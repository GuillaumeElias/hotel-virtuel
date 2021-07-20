import React from "react";

import Konva from "konva";
import { Link } from "react-router-dom";
import CanvasImage from "./ui/CanvasImage.js";

import { Stage, Layer, Text } from "react-konva";

import { SoundPlayer } from "./sound/SoundPlayer";
import {
  windowWidth,
  windowLeftMargin,
  windowTopMargin,
  windowHeight
} from "./utils/screen.js";

class Escalator extends React.Component {
  aimedPosX = 0;
  floorNb = 0;
  nextFloorNb = 0;
  topY = windowHeight / 2 - 456 / 2;

  constructor(props) {
    super(props);

    const { match } = props;

    this.floorNb = 0 /*match.params.floorNb*/;
    this.nextFloorNb = 1 /*parseInt(this.floorNb) + 1*/;

    this.state = {
      characterX: windowWidth * 0.1,
      characterY: windowWidth * 0.42
    };

    if (parseInt(match.params.floorNb) === 1) {
      this.state.characterX = windowWidth * 0.78;
      this.state.characterY = windowWidth * 0.03;
    }

    this.aimedPosX = this.state.characterX;
    this.aimedPosY = this.state.characterY;
  }

  componentDidUpdate() {
    this.topY = windowHeight / 2 - 456 / 2;
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

        if (newX > windowWidth * 0.85) {
          this.anim.stop();
          this.props.history.push(`/floor/${this.nextFloorNb}`);
        } else if (newX < 0.15) {
          this.anim.stop();
          this.props.history.push(`/floor/${this.floorNb}`);
        } else {
          this.setState({
            characterX: newX,
            characterY: newY
          });
        }
      }
    });
    this.anim.start();
  }

  componentWillUnmount() {
    this.anim.stop();
  }

  onMouseDown = (e) => {
    SoundPlayer.playSound("/sounds/click.mp3");
    this.aimedPosX = e.pageX - windowLeftMargin - windowWidth / 30;
  };

  render() {
    return (
      <div
        onMouseDown={this.onMouseDown}
        onTouchEnd={(e) => {
          this.onMouseDown(e.changedTouches[0]);
        }}
      >
        <Stage
          width={window.innerWidth}
          height={window.innerHeight - windowTopMargin}
        >
          <Layer>
            <CanvasImage
              x={windowWidth * 0.1}
              y={this.topY}
              width={windowWidth * 0.8}
              src="/images/escalator"
            />

            <CanvasImage
              x={this.state.characterX}
              y={this.topY + this.state.characterY}
              width={windowWidth / 15}
              src="/images/escalator/character"
            />

            <Text
              x={windowWidth * 0.18}
              y={this.topY + windowWidth * 0.35}
              text={this.floorNb}
            />

            <Text
              x={windowWidth * 0.65}
              y={this.topY + windowWidth * 0.06}
              text={this.nextFloorNb}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default Escalator;
