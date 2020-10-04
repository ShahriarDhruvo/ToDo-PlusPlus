import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useWindowScroll } from "beautiful-react-hooks";
import { NavLink } from "react-router-dom";
import Logout from "../components/account/Logout";

const MainNav = (props) => {
    const [isShadow, setIsShadow] = useState(window.scrollY > 20);

    useWindowScroll(() => {
        setIsShadow(window.scrollY > 20);
    });

    return (
        <Navbar
            sticky="top"
            className={"bg-bg " + (isShadow ? "shadow" : "")}
            style={{ borderRadius: "0.25rem" }}
        >
            <Navbar.Brand
                style={{ fontFamily: "MuseoModerno" }}
                as={NavLink}
                to="/"
            >
                ToDo++
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="main-nav" />

            <Navbar.Collapse id="main-nav">
                <Nav className="ml-auto">
                    <Logout />

                    <Nav.Link
                        as={NavLink}
                        to="/profile"
                        className="pl-3 pr-0 navLink-border"
                    >
                        <FontAwesomeIcon
                            icon={["fas", "user-tie"]}
                            style={{ fontSize: "1.2rem" }}
                            className="fa-icon mb-1 text-syntax"
                        />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNav;
