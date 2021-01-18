import React, { Component } from "react";
import { Container } from "react-bootstrap";
import * as sessionMgmt from "../../services/SessionHandler";
import { Redirect } from "react-router-dom";
import TopBar from "../TopBar";
import OwnerHome from "./OwnerHome";
import WalkerHome from "./WalkerHome";

export default class HomePage extends Component {
  render() {
    if (!sessionMgmt.anyValidSession()) return <Redirect to="/homeNologin" />;

    return (
      <Container>
        <TopBar userName={sessionMgmt.getUserName()}/>
        <h2>Welcome {sessionMgmt.getUserName()} !!!</h2>
        {
          sessionMgmt.getUserRole() == "Owner" ? <OwnerHome /> : <WalkerHome />
        }
      </Container>
    );
  }
}
