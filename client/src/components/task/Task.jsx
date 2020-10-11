import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AddTask from "./AddTask";
import Tasks from "./Tasks";

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [workTitle, setWorkTitle] = useState(undefined);
    const [status, setStatus] = useState(undefined);
    const [variant, setVariant] = useState("danger");
    const [flag, setFlag] = useState(true);

    const params = useParams();

    useEffect(() => {
        let API_URL = `/${params.wid}/task/list/`;

        const loadData = async () => {
            let response = await fetch(API_URL, {
                method: "GET",
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
            });

            data = await response.json();

            response.ok ? setWorkTitle(data[0].title) : setStatus(data.detail);
        };

        loadData();
    }, [params.wid, flag]);

    const updateFlag = () => setFlag(!flag);

    return (
        <Container>
            <h5 className="clogo text-center pt-sm-5 pt-4">{workTitle}</h5>

            <AddTask tasks={tasks} wid={params.wid} updateFlag={updateFlag} />
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
