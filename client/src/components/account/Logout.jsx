import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { NavLink } from "react-router-dom";

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
                <Nav.Link onClick={handleLogOut} className="pr-3 text-syntax">
                    Sign out
                </Nav.Link>
            ) : (
                <Nav.Link as={NavLink} to="/login" className="pr-3 text-syntax">
                    Sign in
                </Nav.Link>
            )}
        </>
    );
};

export default Logout;
