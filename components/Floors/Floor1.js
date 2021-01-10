import React from "react";
import { Link } from "react-router-dom";

const Floor1 = ({ match }) => (
  <div>
    <h3>1</h3>
    <Link to="/escalator/1">Escalier magnétique</Link>
  </div>
);

export default Floor1;
