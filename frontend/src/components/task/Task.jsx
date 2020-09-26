import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AddTask from "./AddTask";
import Tasks from "./Tasks";
import Header from "../../generic/Header";

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [workTitle, setWorkTitle] = useState(undefined);
    const [status, setStatus] = useState(undefined);
    const [variant, setVariant] = useState("danger");
    const [flag, setFlag] = useState(true);

    const params = useParams();

    const token = "6a3fd094a2902e2b0c7180569fae8dd4e0828ea9";

    useEffect(() => {
        let API_URL = `/${params.wid}/task/list/`;

        const loadData = async () => {
            let response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: "TOKEN " + token,
                    "Content-Type": "application/json",
                },
            });

            let data = await response.json();

            if (response.status === 404) {
                setVariant("info");
                setStatus(data.detail);
            } else if (response.status === 403) setStatus(data.detail);
            else setTasks(data);

            API_URL = "/work/details/" + params.wid;

            response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: "TOKEN " + token,
                    "Content-Type": "application/json",
                },
            });

            data = await response.json();

            response.ok ? setWorkTitle(data[0].title) : setStatus(data.detail);
        };

        loadData();
    }, [params.wid, flag]);

    const updateFlag = () => setFlag(!flag);

    return (
        <Container>
            <Header title={workTitle} subTitle=" " />
            <AddTask wid={params.wid} tasks={tasks} updateFlag={updateFlag} />
            <Tasks
                tasks={tasks}
                status={status}
                wid={params.wid}
                variant={variant}
                updateFlag={updateFlag}
            />
        </Container>
    );
};

export default Task;
