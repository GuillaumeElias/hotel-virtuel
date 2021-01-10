import React from "react";
import ImgLink from "./ui/ImgLink";

const divStyle = {
  display: "block"
};

const Home = () => (
  <div style={divStyle}>
    <ImgLink to="/reception" src="https://hotelvirtuel.space/images/hotel" />
  </div>
);

export default Home;
