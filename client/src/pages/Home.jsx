import React, { useState, useEffect } from "react";
import Works from "../components/work/Works";
import Header from "../generic/Header";
import { Container } from "react-bootstrap";
import CreateWork from "../components/work/CreateWork";

const Home = () => {
    const [works, setWorks] = useState([]);
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        const API_URL = "work/list/";

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "GET",
                // headers: {
                //     Accept: "application/json",
                //     Authorization: token,
                //     "Content-Type": "application/json",
                // },
            });

            const data = await response.json();

            setWorks(data);
        };

        // if (token) loadData();
        loadData();
    }, [flag]);

    const updateFlag = () => setFlag(!flag);

    return (
        <Container>
            <Header />
            <CreateWork
                // token={token}
                works={works}
                updateFlag={updateFlag}
            />
            <Works
                // token={token}
                works={works}
                updateFlag={updateFlag}
            />
        </Container>
    );
};

export default Home;
