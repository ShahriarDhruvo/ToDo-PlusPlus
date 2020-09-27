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

library.add(far, fas, fab);

function App() {
    return (
        <Router>
            <ThemeContextProvider>
                <TokenContextProvider>
                    <MainNav />
                    <Switch>
                        <Route
                            exact
                            path="/add/collaborator/:id"
                            component={AddCollaborator}
                        />
                        <Route
                            exact
                            path="/work/update/:id"
                            component={UpdateWork}
                        />
                        <Route
                            exact
                            path="/work/details/:id"
                            component={WorkDetails}
                        />
                        <Route
                            exact
                            path="/profile/:wid/:uid"
                            component={Profile}
                        />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/:wid/task/list/" component={Task} />
                        <Route exact path="/" component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </TokenContextProvider>
                <Footer />
            </ThemeContextProvider>
        </Router>
    );
}

export default App;
