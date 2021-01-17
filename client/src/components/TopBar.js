import React from "react";
import {
  Navbar,
  Nav,
  NavItem,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import * as sessionMgmt from "../services/SessionHandler";
import history from "../services/History";

class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    var self = this;
    return (
      <div>
        <Navbar
          className="justify-content-between"
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <Navbar.Brand
            onClick={() => history.push("/profile/" + self.props.userName)}
          >
            {this.props.userName}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="flex-row">
              <NavItem className="ml-5">
                <Form inline>
                  {sessionMgmt.getUserRole() === "Admin" ? <Nav.Link
                    onClick={() => {
                      history.push("/adminHome")
                    }}
                  >
                    Admin Home
                  </Nav.Link> : null}
                
                  <Nav.Link
                    onClick={() => {
                      sessionMgmt.logout(self.props.userName);
                      history.push("/");
                    }}
                  >
                    Logout
                  </Nav.Link>

                </Form>
              </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default TopBar;
