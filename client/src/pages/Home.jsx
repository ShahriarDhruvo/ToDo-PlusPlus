import React, { useState, useEffect } from "react";
import Works from "../components/work/Works";
import Header from "../generic/Header";
import { Container } from "react-bootstrap";
import CreateWork from "../components/work/CreateWork";
import { useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

const Home = () => {
    const [works, setWorks] = useState([]);
    const [flag, setFlag] = useState(Math.random());

    const { handleLogOut } = useContext(AuthenticationContext);

    useEffect(() => {
        const API_URL = "/api/v1/work/list/";

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "GET",
            });

            if (response.status === 401) handleLogOut();

            const data = await response.json();

            setWorks(data);
        };

        loadData();
    }, [flag, handleLogOut]);

    const updateFlag = () => setFlag(Math.random());

    return (
        <Container className="vertical-center">
            <div className="col">
                <div className="mx-2">
                    <Header />
                    <CreateWork works={works} updateFlag={updateFlag} />
                </div>

                <Works works={works} updateFlag={updateFlag} />
            </div>
        </Container>
    );
};

export default Home;
