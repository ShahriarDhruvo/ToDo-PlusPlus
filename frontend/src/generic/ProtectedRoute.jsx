// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { useContext } from "react";
// import { TokenContext } from "../contexts/TokenContext";

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const { token } = useContext(TokenContext);

//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 token ? <Component {...props} /> : <Redirect to="/login" />
//             }
//         />
//     );
// };

// export default ProtectedRoute;

//'//
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class PretectedRoute extends Component {
    getView = (props) => {
        const { component: Component } = this.props;

        if (!!localStorage.getItem("token")) {
            return <Component {...props} />;
        } else {
            return <Redirect to="/login" />;
        }
    };

    render() {
        const { component: Component, ...rest } = this.props;
        return <Route {...rest} render={this.getView} />;
    }
}

export default PretectedRoute;
