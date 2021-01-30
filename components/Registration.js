import React from "react";
import PaintComponent from "./ui/PaintComponent";
import ImgLink from "./ui/ImgLink";

import { useGlobalState } from "./utils/GlobalState";

import { windowWidth } from "./utils/screen.js";

const Registration = ({ history }) => {
  let width = windowWidth;
  let height = window.innerHeight / 2;

  const [state, dispatch] = useGlobalState();

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
              <input
                type="text"
                value={state.name}
                onChange={(e) => dispatch({ name: e.target.value })}
              />
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
              <input
                type="text"
                value={state.forename}
                onChange={(e) => dispatch({ forename: e.target.value })}
              />
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
        lines={state.catLines}
        onChange={(lines) => dispatch({ catLines: lines })}
        onImageBuilt={(image) => image && dispatch({ catImage: image })}
        x={0}
        y={0}
        width={width - (WINDOW_WIDTH / 8 > 40 ? WINDOW_WIDTH / 8 : 40)}
        height={height}
      />

      <ImgLink
        to="/frontdesk"
        src="images/frontdesk/ok"
        onClick={() => {
          state.registered = true;
          dispatch(state);
        }}
      />
    </div>
  );
};

export default Registration;
