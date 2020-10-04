import React, { createContext, useState, useEffect } from "react";

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState("");

    useEffect(() => {
        const currentAuth = localStorage.getItem("isAuthenticated");

        if (currentAuth !== isAuthenticated) setIsAuthenticated(currentAuth);
    }, [isAuthenticated]);

    const handleAuthentication = (isAuthenticated) => {
        setIsAuthenticated(isAuthenticated);
        localStorage.setItem("isAuthenticated", isAuthenticated);
    };

    return (
        <AuthenticationContext.Provider
            value={{ isAuthenticated, handleAuthentication }}
        >
            {props.children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationContextProvider;
