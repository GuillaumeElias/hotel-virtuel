import React from "react";

import Konva from "konva";
import { Image } from "react-konva";
import { SoundPlayer } from "../sound/SoundPlayer";

class CanvasImage extends React.Component {
  state = {
    image: null,
    width: 0,
    height: 0,
    marginLeft: 0,
    marginTop: 0,
    sizeRatio: 0.2
  };

  interval = 1000;
  maxSizeRatio = 1;
  shrink = false;

  componentDidMount() {
    window.addEventListener("focus", this.onWindowFocus);

    this.loadImages();
    if (this.props.interval && this.props.interval > 0) {
      this.interval = this.props.interval;
    }

    let deltaRatio = 0.5;
    this.anim = new Konva.Animation((frame) => {
      if (this.shrink && this.state.sizeRatio < this.maxSizeRatio) {
        this.shrink = false;
      } else if (!this.shrink && this.state.sizeRatio > this.maxSizeRatio) {
        //do nothing
      } else {
        let ratioInc = deltaRatio * (frame.timeDiff / 1000);
        let sizeRatio;
        if (this.shrink) {
          sizeRatio = this.state.sizeRatio - ratioInc;
        } else {
          sizeRatio = this.state.sizeRatio + ratioInc;
        }

        let margin = (this.state.width / 2) * (1 - sizeRatio);

        this.setState({
          sizeRatio: sizeRatio,
          marginLeft: margin,
          marginTop: margin
        });
      }
    }, this.layer);

    this.anim.start();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImages();
    }
  }

  onWindowFocus = () => {
    console.log("onWindowFocus");
    this.anim.stop();
    this.setState({ sizeRatio: 0.2 });
    this.anim.start();
  };

  componentWillUnmount() {
    window.removeEventListener("focus", this.onWindowFocus);
    this.image1.removeEventListener("load", this.handleLoad);
    this.image2.removeEventListener("load", this.handleLoad2);
    clearInterval(this.timerID);
    this.anim.stop();
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
      let ratio = this.props.width / parseFloat(this.image1.width);
      this.setState({
        width: this.props.width,
        height: this.image1.height * ratio
      });
    } else {
      this.setState({
        width: this.image1.width,
        height: this.image1.height
      });
    }

    this.image2 = new window.Image();
    this.image2.src = this.props.src + "_1.png";
    this.image2.addEventListener("load", this.handleLoad2);
  };

  handleLoad2 = () => {
    this.timerID = setInterval(() => this.tick(), this.interval);
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

  move(c) {
    this.imageNode.move(c);
  }

  render() {
    const handleClick = () => {
      SoundPlayer.playSound("/sounds/click.mp3");
      this.props.onClick();
    };

    return (
      <Image
        x={this.props.x + this.state.marginLeft}
        y={this.props.y + this.state.marginTop}
        width={this.state.width * this.state.sizeRatio}
        height={this.state.height * this.state.sizeRatio}
        image={this.state.image}
        ref={(node) => {
          this.imageNode = node;
        }}
        onClick={() => {
          if (this.state.sizeRatio >= 1.1) {
            handleClick();
          }
        }}
        onMouseEnter={(e) => {
          if (this.props.onClick) {
            // style stage container:
            const container = e.target.getStage().container();
            container.style.cursor = "pointer";
            e.target.setOpacity(0.8);
            e.target.getStage().draw();

            this.maxSizeRatio = 1.1;
            SoundPlayer.playSound("/sounds/hover.mp3");
          }
        }}
        onMouseLeave={(e) => {
          if (this.props.onClick) {
            const container = e.target.getStage().container();
            container.style.cursor = "default";
            e.target.setOpacity(1);
            e.target.getStage().draw();
            this.maxSizeRatio = 1.0;
            this.shrink = true;
          }
        }}
      />
    );
  }
}

CanvasImage.defaultProps = {
  x: 0,
  y: 0
};

export default CanvasImage;
