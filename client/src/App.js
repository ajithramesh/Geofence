import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import Registration from "./components/login/RegistrationForm";
import CustomLogin from "./components/login/CustomLogin";
import history from "./services/History";
import AdminHomePage from "./components/admin/AdminHomePage";
import * as Socket from "./services/AppSocket";
import UserProfile from "./components/profile/UserProfile";
import MapView from "./components/mapView/MapView";

// Check how to send username param in the root link
// Check if we can work on the history link
class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/homeNologin" component={CustomLogin} />
          <Route path="/register" component={Registration} />
          <Route exact path="/profile/:userName" component={UserProfile} />
          <Route exact path="/adminHome" component={AdminHomePage} />
          <Route exact path="/mapView" component={MapView} />
        </Switch>
      </Router>
    );
  }
}

export default App;
