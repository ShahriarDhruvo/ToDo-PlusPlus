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
import Login from "./components/account/Login";
import Profile from "./components/account/Profile";
import Register from "./components/account/Register";
import Task from "./components/task/Task";
import AuthenticationContextProvider from "./contexts/AuthenticationContext";
import ProtectedRoute from "./generic/ProtectedRoute";
import EmailConfirmationSent from "./generic/EmailConfirmationSent";
import EmailConfirm from "./generic/EmailConfirm";
import PasswordChange from "./generic/PasswordChange";
import PasswordReset from "./generic/PasswordReset";
import PassworResetConfirm from "./generic/PasswordResetConfirm";
import About from "./help/About";
import Me from "./help/Me";
// import Trash from "./trash/Trash";

library.add(far, fas, fab);

const App = () => {
    return (
        <Router>
            <ThemeContextProvider>
                <AuthenticationContextProvider>
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
                        <ProtectedRoute
                            exact
                            path="/password/change/"
                            component={PasswordChange}
                        />
                        <Route
                            exact
                            path="/password/reset/"
                            component={PasswordReset}
                        />
                        <Route
                            exact
                            path="/password/reset/confirm/:uid/:token/"
                            component={PassworResetConfirm}
                        />
                        <Route
                            exact
                            path="/email/confirmation/sent/:email"
                            component={EmailConfirmationSent}
                        />
                        <Route
                            exact
                            path="/email/confirmation/:key"
                            component={EmailConfirm}
                        />
                        <Route exact path="/me" component={Me} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />

                        {/* <Route exact path="/trash" component={Trash} /> */}

                        <ProtectedRoute exact path="/" component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </AuthenticationContextProvider>
                <Footer />
            </ThemeContextProvider>
        </Router>
    );
};

export default App;
