import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/styles.scss";

import Home from "./components/pages/Home";
// import NotFound from "./generic/notFound"

import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import ThemeContextProvider from "./contexts/ThemeContext";
import MainNav from "./generic/navbar";
import Footer from "./generic/Footer";
import UpdateWork from "./components/work/UpdateWork";
import AddCollaborator from "./components/work/AddCollaborator";
import WorkDetails from "./components/work/WorkDetails";
import Profile from "./components/user/profile";
import Task from "./components/task/Task";

library.add(far, fas, fab);

function App() {
    return (
        <Router>
            <Switch>
                <ThemeContextProvider>
                    <MainNav />
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
                    <Route
                        exact
                        path="/:wid/task/list/"
                        component={Task}
                    />
                    <Route exact path="/" component={Home} />
                    {/* <Route component={NotFound} /> */}
                    <Footer />
                </ThemeContextProvider>
            </Switch>
        </Router>
    );
}

export default App;
