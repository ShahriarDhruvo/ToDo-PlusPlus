import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CreateWork from "../components/work/CreateWork";
import Trash_Work from "./Trash_Work";
import Header from "../generic/Header";

const Trash = () => {
    const [works, setWorks] = useState([]);
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        const API_URL = "work/list/";

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "GET",
            });

            const data = await response.json();

            setWorks(data);
        };

        loadData();
    }, [flag]);

    const updateFlag = () => setFlag(!flag);

    return (
        <Container>
            <div className="mx-2">
                <Header />
                <CreateWork works={works} updateFlag={updateFlag} />
            </div>

            <Trash_Work works={works} updateFlag={updateFlag} />
        </Container>
    );
};

export default Trash;
