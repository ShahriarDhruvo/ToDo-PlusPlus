import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";

import { AccountCircle } from "@material-ui/icons";

import { useWindowScroll } from "beautiful-react-hooks";
import { NavLink } from "react-router-dom";

const MainNav = () => {
    const [isShadow, setIsShadow] = useState(window.scrollY > 20);

    useWindowScroll(() => {
        setIsShadow(window.scrollY > 20);
    });

    const handleLogOut = async () => {
        const API_URL = "/user/logout/";

        const response = await fetch(API_URL, {
            method: "POST",
        });

        const data = await response.json();

        console.log(data.detail);

        // if (!response.ok) setStatus(data.detail);
        // else handleToken("TOKEN " + data.key);
    };

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
                    <Nav.Link
                        onClick={handleLogOut}
                        className="pr-3 text-syntax"
                    >
                        Log out
                    </Nav.Link>
                    <Nav.Link
                        className="pl-3 pr-0 navLink-border"
                        as={NavLink}
                        to="/profile"
                    >
                        <AccountCircle className="text-syntax" />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNav;
