import React, { useState, useEffect } from "react";
import Works from "../work/Works";
import Header from "../../generic/Header";
import { Container } from "react-bootstrap";
import CreateWork from "../work/CreateWork";

const Home = () => {
    const [works, setWorks] = useState([]);
    const [flag, setFlag] = useState(true);

    const token = "6a3fd094a2902e2b0c7180569fae8dd4e0828ea9";

    useEffect(() => {
        const API_URL = "work/list/";

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: "TOKEN " + token,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            setWorks(data);
        };

        loadData();
    }, [flag]);

    const updateFlag = () => setFlag(!flag);

    return (
        <Container>
            <Header />
            <CreateWork works={works} updateFlag={updateFlag} />
            <Works works={works} updateFlag={updateFlag} />
        </Container>
    );
};

export default Home;
