import React, { createContext, useState, useEffect } from "react";

export const TokenContext = createContext();

const TokenContextProvider = (props) => {
    const [token, setToken] = useState("");

    useEffect(() => {
        const currentToken = localStorage.getItem("token");

        if (currentToken) setToken(currentToken);
    }, []);

    const handleToken = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    };

    return (
        <TokenContext.Provider value={{ token, handleToken }}>
            {props.children}
        </TokenContext.Provider>
    );
};

export default TokenContextProvider;
