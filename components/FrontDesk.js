import React from "react";
import ImageMapper from "react-image-mapper";

import { useGlobalState } from "./utils/GlobalState";

const FrontDesk = ({ history }) => {
  const [state] = useGlobalState();

  if (state.registered) {
    return (
      <div>
        <ImageMapper
          width={window.innerWidth}
          imgWidth={446}
          src="images/frontdesk/frontdeskguy_registered.png"
          onClick={() => {
            history.push("/registration");
          }}
          map={{
            name: "",
            areas: [{ href: "#", coords: [252, 243, 173, 142], shape: "rect" }]
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <ImageMapper
        width={window.innerWidth}
        imgWidth={446}
        src="images/frontdesk/frontdeskguy.png"
        onClick={() => {
          history.push("/registration");
        }}
        map={{
          name: "",
          areas: [{ href: "#", coords: [63, 62, 143, 167], shape: "rect" }]
        }}
      />
    </div>
  );
};

export default FrontDesk;
