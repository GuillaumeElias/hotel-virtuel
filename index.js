import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, withRouter, Redirect } from "react-router-dom";

import { GlobalStateProvider } from "./components/utils/GlobalState";

import Reception from "./components/Reception";
import FrontDesk from "./components/FrontDesk";
import Registration from "./components/Registration";
import Home from "./components/Home";
import Lobby from "./components/Lobby";
import Bar from "./components/Bar";
import Plant from "./components/Plant";
import ManAndPlant from "./components/ManAndPlant";
import Elevator from "./components/Elevator";
import Escalator from "./components/Escalator";
import Floor1 from "./components/Floors/Floor1";
import BackButton from "./components/ui/BackButton";

import Player from "./components/sound/Player.js";

import "./style.css";

const BaseRoute = () => {
  const BackBtn = withRouter(BackButton);

  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <div id="content">
          <Route exact path="/" component={Home} />

          <Route path="/reception" component={Reception} />
          <Route path="/frontdesk" component={FrontDesk} />
          <Route path="/registration" component={Registration} />
          <Route path="/lobby" component={Lobby} />
          <Route path="/bar" component={Bar} />
          <Route path="/elevator/:floorNb" component={Elevator} />
          <Route path="/escalator/:floorNb" component={Escalator} />
          <Route path="/floor/0" render={() => <Redirect to="/reception" />} />
          <Route path="/floor/1" component={Floor1} />
          <Route path="/plant" component={Plant} />
          <Route path="/manandplant" component={ManAndPlant} />

          <BackBtn />

          <Player url="https://hotelvirtuel.space/sound/HotelVirtuel_0.mp3" />
        </div>
      </BrowserRouter>
    </GlobalStateProvider>
  );
};

render(<BaseRoute />, document.getElementById("root"));
