import React from "react";

import { Image } from "react-konva";

class UrlImg extends React.Component {
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
  reloadImage() {
    this.setState({
      image: this.image
    });
  }

  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  render() {
    return (
      <Image
        id={this.props.id}
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        image={this.state.image}
        draggable={!!this.props.draggable}
        onDragStart={this.props.onDragStart}
        onDragEnd={this.props.onDragEnd}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onClick={this.props.onClick}
        scaleX={!this.props.scaleX ? 1 : this.props.scaleX}
        scaleY={!this.props.scaleY ? 1 : this.props.scaleY}
        ref={(node) => {
          this.imageNode = node;
        }}
        onTouchEnd={this.props.onClick}
      />
    );
  }
}

export default UrlImg;
