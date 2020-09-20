import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/styles.scss";

import Home from "./components/Home";
// import NotFound from "./generic/notFound"

import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from '@fortawesome/free-brands-svg-icons'
import ThemeContextProvider from "./contexts/ThemeContext";
import MainNav from "./generic/navbar";
import Footer from "./generic/Footer";

library.add(far, fas, fab);

function App() {
    return (
        <Router>
            <Switch>
                <ThemeContextProvider>
                    <MainNav />
                    <Route exact path="/" component={Home} />
                    {/* <Route component={NotFound} /> */}
                    <Footer />
                </ThemeContextProvider>
            </Switch>
        </Router>
    );
}

export default App;
