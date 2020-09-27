import React, { createContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

export const TokenContext = createContext();

const TokenContextProvider = (props) => {
    const [token, setToken] = useState("");

    useEffect(() => {
        const currentToken = localStorage.getItem("token");

        if (currentToken !== token) setToken(currentToken);
    }, [token]);

    const handleToken = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    };

    return (
        <TokenContext.Provider value={{ token, handleToken }}>
            {!token ? (
                <>
                    <Redirect to="/login" />
                    {props.children}
                </>
            ) : (
                <>{props.children}</>
            )}
        </TokenContext.Provider>
    );
};

export default TokenContextProvider;
