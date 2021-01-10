import React from "react";
import { Link } from "react-router-dom";

const Lobby = ({ history }) => (
  <div>
    <h2>Lobby</h2>
    <Link to={"/reception"}>Reception</Link>
  </div>
);

export default Lobby;
