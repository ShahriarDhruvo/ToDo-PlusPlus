import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../../generic/Modal";
import { Link } from "react-router-dom";

const Works = (props) => {
    // Button Fade-in/out anitmation
    document.addEventListener("animationstart", (e) => {
        if (e.animationName === "fade-in") {
            e.target.classList.add("did-fade-in");
        }
    });

    document.addEventListener("animationend", (e) => {
        if (e.animationName === "fade-out") {
            e.target.classList.remove("did-fade-in");
        }
    });
    // Button Fade-in/out anitmation
    const [status, setStatus] = useState(undefined);

    const markAsCompleted = (work) => {
        const completed = !work.completed;
        const API_URL = `/work/update/${work.id}`;

        const loadData = async () => {
            try {
                fetch(API_URL, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        Authorization: props.token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        completed: completed,
                        title: work.title,
                    }),
                });

                // Try to create a universal error to handle all this kind of shits
                // const data = await response.json();
                setStatus(undefined); // for warning -_-
                // if (!response.ok) setError(data.title);
                props.updateFlag();
            } catch (error) {
                // setError(error);
            }
        };

        if (props.token) loadData();
    };

    const deleteItem = (id) => {
        const API_URL = `/work/delete/${id}`;

        const loadData = async () => {
            fetch(API_URL, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: props.token,
                    "Content-Type": "application/json",
                },
            });

            props.updateFlag();
        };

        loadData();
    };

    return (
        <>
            {props.works.length ? (
                <div className="row text-center">
                    {status && <Alert variant="danger">{status}</Alert>}

                    {props.works.map((work, index) => (
                        <div key={index} className="col-lg-6 align-self-center">
                            <div
                                className={
                                    "ccard my-1 " +
                                    (work.completed
                                        ? "bg-complete-bg"
                                        : "bg-main-bg")
                                }
                            >
                                <div className="card-body">
                                    {!work.completed ? (
                                        <span>{work.title}</span>
                                    ) : (
                                        <strike>{work.title}</strike>
                                    )}
                                </div>

                                <div className="card-footer justify-content-around action-button">
                                    <Button
                                        onClick={() => markAsCompleted(work)}
                                        variant={
                                            work.completed ? "info" : "complete"
                                        }
                                        className="w-25"
                                        size="sm"
                                    >
                                        {!work.completed ? (
                                            <>
                                                <FontAwesomeIcon
                                                    className="mb-1 mr-sm-1"
                                                    icon={["fas", "check"]}
                                                />
                                                <span className="d-none d-sm-inline">
                                                    Complete
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <FontAwesomeIcon
                                                    className="mb-1 mr-sm-1"
                                                    icon={["fa", "ban"]}
                                                />
                                                <span className="d-none d-sm-inline">
                                                    Incomplete
                                                </span>
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        size="sm"
                                        as={Link}
                                        variant="secondary"
                                        className="w-25 mx-1"
                                        to={"/work/details/" + work.id}
                                    >
                                        <FontAwesomeIcon
                                            className="mb-1 mr-sm-1"
                                            icon={["fa", "info"]}
                                        />
                                        <span className="d-none d-sm-inline">
                                            Details
                                        </span>
                                    </Button>

                                    <Button
                                        size="sm"
                                        as={Link}
                                        variant="main"
                                        className="w-25 mr-1"
                                        to={`/${work.id}/task/list/`}
                                    >
                                        <FontAwesomeIcon
                                            className="mb-1 mr-sm-1"
                                            icon={["fas", "tasks"]}
                                        />
                                        <span className="d-none d-sm-inline">
                                            Tasks
                                        </span>
                                    </Button>

                                    <CustomModal
                                        variant="remove"
                                        modalTitle="Delete"
                                        actionButtonSize="sm"
                                        actionVariant="danger"
                                        actionButtonClass="w-25"
                                        handleAction={() => deleteItem(work.id)}
                                        modalBody="Do you really want to delete this work?"
                                    >
                                        <FontAwesomeIcon
                                            className="mb-1 mr-sm-1"
                                            icon={["fas", "trash"]}
                                        />
                                        <span className="d-none d-sm-inline">
                                            Remove
                                        </span>
                                    </CustomModal>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="ccard card-body text-center">
                    <Alert variant="info" className="m-0">
                        Your work list is empty!
                    </Alert>
                </div>
            )}
        </>
    );
};

export default Works;
