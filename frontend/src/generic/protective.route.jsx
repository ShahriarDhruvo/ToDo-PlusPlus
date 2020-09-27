import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../contexts/TokenContext";

const ProtectiveRoute = ({ component: Component, ...rest }) => {
    const { token } = useContext(TokenContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                token ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default ProtectiveRoute;
