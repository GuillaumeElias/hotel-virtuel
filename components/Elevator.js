import React from "react";
import { Link } from "react-router-dom";

const Elevator = ({ match, history }) => (
  <div>
    <h2>Elevator</h2>
    <ul>
      <li>
        <Link to={"/reception"}>Reception</Link>
      </li>
      <li>
        <Link to={"/floor/1"}>1st floor</Link>
      </li>
      <li>
        <Link to={"/floor/2"}>2nd floor</Link>
      </li>
      <li>
        <Link to={"/floor/2"}>3rd floor</Link>
      </li>
    </ul>
  </div>
);

export default Elevator;
