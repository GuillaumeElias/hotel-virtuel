import React from "react";
import { SoundPlayer } from "../sound/SoundPlayer";

const BackButton = ({ history, match, path }) => {
  const goBack = () => {
    SoundPlayer.playSound("/sounds/click.mp3");
    history.push(path);
  };

  if (location.pathname === "/") {
    return <div />;
  }

  return (
    <div>
      <a onClick={goBack}>
        <img src="/images/back.png" alt="back" />
      </a>
    </div>
  );
};

export default BackButton;
