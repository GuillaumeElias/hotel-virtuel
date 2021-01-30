import React from "react";

import Konva from "konva";
import { Stage, Layer } from "react-konva";
import CanvasImage from "./ui/CanvasImage";
import ScrollTop from "./utils/ScrollTop.js";

class ManAndPlant extends React.Component {
  mouseX = 0;
  mouseY = 0;
  layer = null;

  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    };
  }

  componentDidMount() {
    this.anim = new Konva.Animation((frame) => {
      let aimedPosX = this.mouseX + window.innerWidth / 3;
      let aimedPosY = this.mouseY + window.innerHeight / 3;

      let deltaX = aimedPosX - this.state.x;
      let deltaY = aimedPosY - this.state.y;

      this.setState({
        x: this.state.x + deltaX * (frame.timeDiff / 1000),
        y: this.state.y + deltaY * (frame.timeDiff / 1000)
      });
    }, this.layer);

    this.anim.start();
  }
  componentWillUnmount() {
    this.anim.stop();
  }

  handleMouseMove = (e) => {
    this.mouseX = e.pageX;
    this.mouseY = e.pageY;
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        <ScrollTop />
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer ref={(node) => (this.layer = node)}>
            <CanvasImage
              ref={(node) => (this.imgRef = node)}
              src="/images/lobby/man"
              x={this.state.x}
              y={this.state.y}
              interval={100}
              onClick={() => {}}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default ManAndPlant;
