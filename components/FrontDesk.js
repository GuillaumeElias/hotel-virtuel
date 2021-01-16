import React from "react";
import { Link } from "react-router-dom";
import PaintComponent from "./ui/PaintComponent";

const FrontDesk = ({ history }) => {
  let width = window.innerWidth / 2;
  let height = window.innerHeight / 2;

  return (
    <div>
      <table>
        <tr>
          <td>
            <img alt="nom" width={width / 2} src="images/frontdesk/name.png" />
          </td>
          <td>
            <input type="text" />
          </td>
        </tr>
        <tr>
          <td>
            <img
              alt="prenom"
              width={width / 2}
              src="images/frontdesk/forename.png"
            />
          </td>
          <td>
            <input type="text" />
          </td>
        </tr>
        <tr>
          <td>
            <img
              alt="prenom"
              width={width / 2}
              src="images/frontdesk/drawacat.png"
            />
          </td>
        </tr>
        <tr>
          <td>
            <PaintComponent x={0} y={0} width={width} height={height} />
          </td>
        </tr>
      </table>

      <Link to={"/reception"}>Reception</Link>
    </div>
  );
};

export default FrontDesk;
