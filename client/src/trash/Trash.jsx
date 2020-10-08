import React, { useState, useEffect } from "react";
import emoji from "react-easy-emoji";
import { Container } from "react-bootstrap";
import CreateWork from "../components/work/CreateWork";
import Trash_Work from "./Trash_Work";

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
                <div className="clogo mt-4 text-center mb-2">
                    <div className="card-body">
                        <div style={{ fontSize: "1.65rem" }}>ToDO++</div>
                        <span className="" style={{ fontSize: "0.8rem" }}>
                            More than some To Do List {emoji("🤪")}
                        </span>
                    </div>
                </div>
                <CreateWork works={works} updateFlag={updateFlag} />
            </div>

            <Trash_Work works={works} updateFlag={updateFlag} />
        </Container>
    );
};

export default Trash;
