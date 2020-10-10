import React from "react";
import { Navbar, Nav } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { NavLink } from "react-router-dom";
import Logout from "../components/account/Logout";

const MainNav = () => {
    return (
        <Navbar>
            <Navbar.Brand className="clogo" as={NavLink} to="/">
                {/* <img
                    src="/img/logo.png"
                    alt="logo"
                    className="mb-1 mr-1"
                    style={{ width: "1.5rem" }}
                /> */}
                ToDo++
            </Navbar.Brand>

            <Navbar.Collapse>
                <Nav className="ml-auto">
                    <Logout />

                    <Nav.Link as={NavLink} to="/profile">
                        <FontAwesomeIcon
                            icon={["fas", "user-tie"]}
                            style={{ fontSize: "1.1rem" }}
                            className="fa-icon mb-1 text-syntax"
                        />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNav;
