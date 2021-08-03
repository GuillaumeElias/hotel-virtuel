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
import Floor2 from "./components/Floors/Floor2";
import Floor3 from "./components/Floors/Floor3";
import Room101 from "./components/Floors/Room101";
import Room302 from "./components/Floors/Room302";
import JanitorRoom from "./components/Floors/JanitorRoom";
import Rooftop from "./components/Floors/Rooftop";

import MusicPlayerUI from "./components/sound/MusicPlayerUI.js";

import "./style.css";

const BaseRoute = () => {
  const [resize, setResize] = React.useState({})

  React.useEffect(() => {
    function handleResize() {
      setResize({})
    }

    window.addEventListener('resize', handleResize);

    return _ => {
      window.removeEventListener('resize', handleResize);
    }
  })

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
          <Route path="/plant" component={Plant} />
          <Route path="/manandplant" component={ManAndPlant} />
          <Route path="/elevator/:floorNb" component={Elevator} />
          <Route path="/escalator/:floorNb" component={Escalator} />
          <Route path="/floor/0" render={() => <Redirect to="/reception" />} />
          <Route path="/floor/1" component={Floor1} />
          <Route path="/floor/2" component={Floor2} />
          <Route path="/floor/3" component={Floor3} />
          <Route path="/room/101" component={Room101} />
          <Route path="/room/302" component={Room302} />
          <Route path="/room/janitor" component={JanitorRoom} />

          <MusicPlayerUI />
        </div>
        <Route path="/floor/rooftop" component={Rooftop} />
      </BrowserRouter>
    </GlobalStateProvider>
  );
};

render(<BaseRoute />, document.getElementById("root"));
