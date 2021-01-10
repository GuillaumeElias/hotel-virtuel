import React from "react";
import { Link } from "react-router-dom";

const Escalator = ({ match }) => {
  const floorNb = match.params.floorNb;
  const nextFloorNb = parseInt(floorNb) + 1;

  return (
    <div>
      <h2>Escalier magnétique</h2>
      {floorNb == 0 ? (
        <Link to="/reception">Réception</Link>
      ) : (
        <Link to={`/floor/${floorNb}`}>Etage {floorNb}</Link>
      )}
      <br />
      <Link to={"/floor/" + nextFloorNb}>Etage {nextFloorNb}</Link>
    </div>
  );
};

export default Escalator;
