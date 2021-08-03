import React from "react";
import Konva from "konva";
import { Stage, Layer, Image, Rect } from "react-konva";

import CanvasImage from "../ui/CanvasImage";
import BackButton from "../ui/BackButton";

import * as boids from "../utils/boids";
import { windowHeight, windowTopMargin, windowWidth } from "../utils/screen";
import { MusicPlayer } from "../sound/MusicPlayer";
import { VoicePlayer } from "../sound/VoicePlayer";
import { CollectionsBookmarkRounded } from "@material-ui/icons";

Number.prototype.mod = function(n) {
  return ((this%n)+n)%n;
};

class Rooftop extends React.Component {
  state = {
    img1_X: 0,
    img2_X: 0,
    viewAngle: 0,
    velX: 0,
    height: 0,
    width: 0,
    mousePos: { x: 0, y: 0 },
    birds: [],
    dots: [],
    flyingGuy: {x: window.innerWidth * 1.4, y: 30}
  };

  interval = 1000;
  numberOfBirds = 10;
  numberOfDots = 6;
  followDistance = window.innerWidth * 0.5;

  componentDidMount() {
    window.addEventListener("resize", this.onWindowResize)
    this.loadImage();

    let dots = [];
    for (let i = 0; i < this.numberOfDots; i++) {
      dots[i] = {x: 0, y: 0};
    }

    this.setState({dots});
  }

  componentWillUnmount() {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
    if (this.anim) {
      this.anim.stop();
    }
  }

  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = "/images/rooftop/rooftop.png";
    this.image.addEventListener("load", this.handleLoad);
  }

  computeWidthAndHeight = () => {
    let height = window.innerHeight - 50;
    let ratio = height / this.image.height;

    let width = this.image.width * ratio;
    this.setState({
      height,
      width
    });
  }

  handleLoad = () => {
    this.computeWidthAndHeight();

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

      let ratio = Math.abs(this.state.viewAngle) / this.state.width;
      if(ratio > 0.5){
        ratio = 0.5 - (ratio - 0.5);
      }
      ratio *= 2;
      MusicPlayer.setLayerVolume(2, ratio);
    });

    //INITIALIZE BIRDS
    var birds = [];
    for (var i = 0; i < this.numberOfBirds; i++) {
      birds[i] = {
        posX: boids.random(this.state.width),
        posY: boids.random(window.innerHeight * 0.6),
        size: boids.randomBetween(23, 40),
        interval: boids.randomBetween(400, 800),
        deltaX: 0,
        deltaY: 0
      };
    }
    this.setState({ birds });

    this.anim.start();
    this.timerID = setInterval(() => this.tick(), 100);
  };

  tick() {
    this.moveBirds();
    this.moveFlyingGuy();
    this.moveDots();
  }

  lastThink = 0;
  birdsThink = () => {
    let now = Date.now();
    if (now - this.lastThink > 1000) {
      this.lastThink = now;

      let birds = [...this.state.birds];
      for (var i = 0; i < birds.length; i++) {
        if (
          Math.abs(
            this.state.mousePos.x - birds[i].posX - this.state.viewAngle
          ) > this.followDistance
        ) {
          birds[i].deltaX = boids.random(2) - 4;
          birds[i].deltaY = boids.random(2) - 4;

          if(birds[i].posY <= 50 && birds[i].deltaY <= 0){
            birds[i].deltaY = -birds[i].deltaY;
          }
        } else {
          let aimedPosX = this.state.mousePos.x + boids.random(0, 20) - 10;
          let aimedPosY = this.state.mousePos.y + boids.random(0, 20) - 10;

          aimedPosX -= this.state.img1_X;

          birds[i].deltaX = (aimedPosX - birds[i].posX) / 100;
          birds[i].deltaY = (aimedPosY - birds[i].posY) / 100;
        }
      }
      this.setState({ birds });
    }
  };

  lastThink = 0;
  moveBirds = () => {
    let birds = [...this.state.birds];
    for (var i = 0; i < this.numberOfBirds; i++) {
      birds[i].posX += birds[i].deltaX;
      birds[i].posY += birds[i].deltaY;
    }
    this.setState({ birds });
  };

  moveDots = () => { 

    let x = this.state.mousePos.x;
    let y = this.state.mousePos.y;

    let dots = [...this.state.dots];

    dots.forEach((dot, index, dots) => {
      var nextDot =  dots[index + 1] || dots[0];
      
      dot.x = x;
      dot.y = y;
      
      x += (nextDot.x - dot.x) * .6;
      y += (nextDot.y - dot.y) * .6;
    });

    this.setState({dots});
  };

  moveFlyingGuy = () => {

    let addY = Math.random() * 10 - 5;
    if(this.state.flyingGuy && (
      this.state.flyingGuy.y + addY < 0 
      || this.state.flyingGuy.y + addY > window.innerHeight - 50)){
      addY = -addY;
    }

    this.setState({flyingGuy: {
      x: (this.state.flyingGuy.x + 3 ),
      y: this.state.flyingGuy.y + addY
    }})
  };

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

    this.setState({
      velX: vel,
      mousePos: { x: e.pageX, y: e.pageY }
    });

    this.birdsThink();

    if(MusicPlayer.layers.length == 0){
      setTimeout(() => { this.initializeMusic(); }, 0);
    }else if(MusicPlayer.layers.length == 4){
        MusicPlayer.setLayerVolume(1, e.pageY / window.innerHeight - 0.1);
        MusicPlayer.setLayerVolume(3, e.pageX / window.innerWidth);
    }
  };

  initializeMusic(){

    if(MusicPlayer.currentMusic){
      MusicPlayer.currentMusic.pause();
    }

    const firstLayer = MusicPlayer.addLayer("/music/layers/layer_main.mp3");
    MusicPlayer.addLayer("/music/layers/layer_1.mp3");
    MusicPlayer.addLayer("/music/layers/layer_2.mp3");
    MusicPlayer.addLayer("/music/layers/layer_3.mp3");
    MusicPlayer.setLayerVolume(firstLayer, 0.8);
  };

  handleClick = (e) => {
    if (e.pageY < 150) {
      VoicePlayer.playWord("/voice/words/oiseau.mp3");
    } else if (e.pageY < window.innerHeight * 0.6) {
      VoicePlayer.playWord("/voice/words/maison.mp3");
    } else if( e.pageY < windowHeight - 50){
      VoicePlayer.playWord("/voice/words/arbre.mp3");
    }
  };

  onWindowResize = () => {
    this.computeWidthAndHeight();
  }

  render() {

    if(!this.state.width){
      return <div></div>
    }

    return (
      <div
        onMouseMove={this.mouseMoved}
        onTouchEnd={(e) => {
          const event = e.nativeEvent.changedTouches[0];
          this.mouseMoved(event);
          this.handleClick(event);
        }}
        style={{ overflowX: "hidden", marginTop: -windowTopMargin }}
        onClick={this.handleClick}
      >
        <Stage width={window.innerWidth} height={window.innerHeight - 50}>
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
                x={(this.state.birds[i].posX + this.state.viewAngle).mod(this.state.width)}
                y={this.state.birds[i].posY}
                width={this.state.birds[i].size}
                interval={this.state.birds[i].interval}
              />
            ))}

            {this.state.dots.map((name, i) => (
              <Rect
                key={i}
                x={this.state.dots[i].x}
                y={this.state.dots[i].y}
                width={1}
                height={2}
                fill="#B97A57"
              />
            ))}

            <CanvasImage
                src="/images/rooftop/flyingguy"
                x={(this.state.flyingGuy.x + this.state.viewAngle ).mod(this.state.width)}
                y={this.state.flyingGuy.y}
                width={windowWidth / 12}
                interval={300}
                onClick={(e) => {
                  e.target.attrs.width = e.target.attrs.width * 2;
                }}
              />
          </Layer>
        </Stage>
        <div style={{ position: "absolute", bottom: "8px", left: "8px" }}>
          <BackButton
            path="/floor/3"
            history={this.props.history}
            onClick={() => {
              MusicPlayer.removeAllLayers();
              MusicPlayer.setMusic("/music/HotelVirtuel_0.mp3");
            }}
          />
        </div>
      </div>
    );
  }
}

export default Rooftop;
