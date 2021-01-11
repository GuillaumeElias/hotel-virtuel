import React from "react";
import { Link } from "react-router-dom";

const FrontDesk = ({ history }) => (
  <div>
    <h2>Front Desk</h2>
    <Link to={"/reception"}>Reception</Link>
  </div>
);

export default FrontDesk;
