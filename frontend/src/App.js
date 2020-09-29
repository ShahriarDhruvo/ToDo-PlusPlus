import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/styles.scss";

import Home from "./pages/Home";
import NotFound from "./generic/NotFound";

import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import ThemeContextProvider from "./contexts/ThemeContext";
import MainNav from "./generic/Navbar";
import Footer from "./generic/Footer";
import UpdateWork from "./components/work/UpdateWork";
import AddCollaborator from "./components/work/AddCollaborator";
import WorkDetails from "./components/work/WorkDetails";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Register from "./components/user/Register";
import Task from "./components/task/Task";
import TokenContextProvider from "./contexts/TokenContext";
import ProtectedRoute from "./generic/ProtectedRoute";
import ConfirmEmail from "./generic/ConfirmEmail";

library.add(far, fas, fab);

function App() {
    return (
        <Router>
            <ThemeContextProvider>
                <TokenContextProvider>
                    <MainNav />
                    <Switch>
                        <ProtectedRoute
                            exact
                            path="/add/collaborator/:id"
                            component={AddCollaborator}
                        />
                        <ProtectedRoute
                            exact
                            path="/work/update/:id"
                            component={UpdateWork}
                        />
                        <ProtectedRoute
                            exact
                            path="/work/details/:id"
                            component={WorkDetails}
                        />
                        <ProtectedRoute
                            exact
                            path="/profile/:wid/:uid"
                            component={Profile}
                        />
                        <ProtectedRoute
                            exact
                            path="/profile"
                            component={Profile}
                        />
                        <ProtectedRoute
                            exact
                            path="/:wid/task/list/"
                            component={Task}
                        />
                        <Route
                            exact
                            path="/confirm-email"
                            component={ConfirmEmail}
                        />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <ProtectedRoute exact path="/" component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </TokenContextProvider>
                <Footer />
            </ThemeContextProvider>
        </Router>
    );
}

export default App;
