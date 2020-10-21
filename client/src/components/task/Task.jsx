import React, { useState, useEffect, useContext } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AddTask from "./AddTask";
import Tasks from "./Tasks";

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [workTitle, setWorkTitle] = useState(undefined);
    const [status, setStatus] = useState(undefined);
    const [variant, setVariant] = useState("danger");
    const [flag, setFlag] = useState(Math.random());
    const { handleLogOut } = useContext(AuthenticationContext)

    const params = useParams();

    useEffect(() => {
        let API_URL = `/api/v1/${params.wid}/task/list/`;

        const loadData = async () => {
            let response = await fetch(API_URL, {
                method: "GET",
            });

            if (response.status === 401) handleLogOut();

            let data = await response.json();

            if (response.status === 404) {
                setVariant("info");
                setStatus(data.detail);
            } else if (response.status === 403) setStatus(data.detail);
            else setTasks(data);

            API_URL = "/api/v1/work/details/" + params.wid;

            response = await fetch(API_URL, {
                method: "GET",
            });

            data = await response.json();

            response.ok ? setWorkTitle(data[0].title) : setStatus(data.detail);
        };

        loadData();
    }, [params.wid, flag, handleLogOut]);

    const updateFlag = () => setFlag(Math.random());

    return (
        <Container className="vertical-center">
            <div className="col">
                <h5 className="clogo text-center">{workTitle}</h5>

                <AddTask
                    tasks={tasks}
                    wid={params.wid}
                    updateFlag={updateFlag}
                />

                <Tasks
                    tasks={tasks}
                    status={status}
                    wid={params.wid}
                    variant={variant}
                    updateFlag={updateFlag}
                />
            </div>
        </Container>
    );
};

export default Task;
