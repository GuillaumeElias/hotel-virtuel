import React from "react";
import PaintComponent from "./ui/PaintComponent";
import ImgLink from "./ui/ImgLink";

const Registration = ({ history }) => {
  let width = window.innerWidth;
  let height = window.innerHeight / 2;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <img
                alt="nom"
                width={width / 4}
                src="images/frontdesk/name.png"
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
                width={width / 4}
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
        </tbody>
      </table>

      <PaintComponent
        x={0}
        y={0}
        width={
          width - (window.innerWidth / 8 > 40 ? window.innerWidth / 8 : 40)
        }
        height={height}
      />

      <ImgLink to="/frontdesk" src="images/frontdesk/ok" onClick={() => {}} />
    </div>
  );
};

export default Registration;
