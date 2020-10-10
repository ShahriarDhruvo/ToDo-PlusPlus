import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Logout = () => {
    const { isAuthenticated, handleAuthentication } = useContext(
        AuthenticationContext
    );

    const handleLogOut = async () => {
        const API_URL = "/accounts/logout/";

        const response = await fetch(API_URL, {
            method: "POST",
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            handleAuthentication("");
            window.location.replace("/login");
        }
    };

    return (
        <>
            {isAuthenticated ? (
                <Nav.Link onClick={handleLogOut} className="text-syntax">
                    <FontAwesomeIcon
                        className="mb-1 mr-sm-1"
                        icon={["fas", "sign-out-alt"]}
                    />
                    <span className="d-none d-sm-inline" style={{ fontSize: "0.95rem" }}>Sign out</span>
                </Nav.Link>
            ) : (
                <Nav.Link as={NavLink} to="/login" className="text-syntax">
                    <FontAwesomeIcon
                        className="mb-1 mr-sm-1"
                        icon={["fas", "sign-in-alt"]}
                    />
                    <span className="d-none d-sm-inline" style={{ fontSize: "0.95rem" }}>Sign in</span>
                </Nav.Link>
            )}
        </>
    );
};

export default Logout;
