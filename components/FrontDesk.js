import React from "react";
import ImageMapper from "react-image-mapper";

const Home = ({ history }) => (
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

export default Home;
