import React, { useEffect, useState } from "react";
import { Alert, Container, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../../generic/Modal";

const WorkDetails = () => {
    const [work, setWork] = useState({});
    const [collaborators, setCollaborators] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [flag, setFlag] = useState(true);
    const [status, setStatus] = useState(undefined);
    const [variant, setVariant] = useState("danger");

    const params = useParams();

    useEffect(() => {
        let API_URL = "/work/details/" + params.id;

        const loadData = async () => {
            let response = await fetch(API_URL, {
                method: "GET",
                // headers: {
                //     Accept: "application/json",
                //     Authorization: token,
                //     "Content-Type": "application/json",
                // },
            });

            let data = await response.json();

            if (!response.ok) setStatus(data.detail);
            setWork(data[0]);

            API_URL = "/work/list/collaborator/details/" + params.id;

            response = await fetch(API_URL, {
                method: "GET",
                // headers: {
                //     Accept: "application/json",
                //     Authorization: token,
                //     "Content-Type": "application/json",
                // },
            });

            data = await response.json();

            if (!response.ok) setStatus(data.detail);
            setCollaborators(data);

            API_URL = "/" + params.id + "/task/list/";

            response = await fetch(API_URL, {
                method: "GET",
                // headers: {
                //     Accept: "application/json",
                //     Authorization: token,
                //     "Content-Type": "application/json",
                // },
            });

            data = await response.json();

            if (response.status !== 404) setTasks(data);
        };

        // if (token) loadData();
        loadData();
    }, [params.id, flag]);

    const removeCollaborator = (collaborator) => {
        const API_URL = `/work/remove/collaborator/${params.id}/${collaborator}`;

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "PATCH",
                // headers: {
                //     Accept: "application/json",
                //     Authorization: token,
                //     "Content-Type": "application/json",
                // },
            });

            const data = await response.json();

            if (!response.ok) setStatus(data.detail);
            else {
                setFlag(!flag);
                setStatus(
                    `You have successfully removed ${collaborator} from collaborator's list.`
                );
                setVariant("success");
            }
        };

        loadData();
    };

    return (
        <Container className="vertical-center">
            <div
                className="ccard card-body text-center w-100 bg-main-bg"
                style={{ maxWidth: "30rem", minWidth: "20rem" }}
            >
                <div className="text-center">
                    {status && <Alert variant={variant}>{status}</Alert>}
                </div>

                <div className="mb-3">
                    <h4>
                        <b>{work.title}</b>
                    </h4>

                    <Link to={"/work/update/" + work.id}>
                        <FontAwesomeIcon
                            className="mb-1 mr-sm-1"
                            icon={["fas", "edit"]}
                        />
                        <span className="d-none d-sm-inline">Edit</span>
                    </Link>
                </div>

                <b>Status: </b>
                {work.completed ? "Completed" : "Incomplete"}
                <br />

                <b>Task Count: </b>
                {tasks.length}
                <br />

                <b>Owner: </b>
                {collaborators.map((collaborator) => {
                    if (collaborator.pk === work.owner) {
                        return (
                            <Link
                                key={collaborator.pk}
                                to={`/profile/${params.id}/${collaborator.pk}`}
                            >
                                {collaborator.username}
                            </Link>
                        );
                    }
                    return undefined;
                })}
                <br />

                <b>Collaborators: </b>
                {collaborators.map((collaborator) => (
                    <div key={collaborator.pk} className="mt-2">
                        <Button
                            size="sm"
                            as={Link}
                            to={`/profile/${params.id}/${collaborator.pk}`}
                            className="mr-2"
                            variant="outline-primary"
                        >
                            {collaborator.username}
                        </Button>

                        <CustomModal
                            modalTitle="Delete"
                            actionButtonSize="sm"
                            actionVariant="danger"
                            variant="outline-danger"
                            handleAction={() =>
                                removeCollaborator(collaborator.username)
                            }
                            modalBody={`Do you really want to remove "${collaborator.username}" from "${work.title}" work's collaboration?`}
                        >
                            <FontAwesomeIcon
                                className="mb-1"
                                icon={["fas", "user-slash"]}
                            />
                        </CustomModal>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default WorkDetails;
