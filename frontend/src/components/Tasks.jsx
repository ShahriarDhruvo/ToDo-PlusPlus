import React from "react";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Tasks = (props) => {
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

    return (
        <div className="row text-center">
            {props.tasks.map((task, index) => (
                <div key={index} className="col-lg-6 align-self-center">
                    <div className="bg-main-bg my-1 crounded cborder">
                        <div className="card-body">
                            {!task.completed ? (
                                <span>{task.title}</span>
                            ) : (
                                <strike>{task.title}</strike>
                            )}

                            <div className="mt-3 justify-content-around action-button">
                                <Button
                                    onClick={() => props.strikeUnstrike(task)}
                                    variant="complete"
                                    className="w-25"
                                    size="sm"
                                >
                                    <FontAwesomeIcon
                                        className="mb-1 mr-sm-1"
                                        icon={["fas", "check"]}
                                    />
                                    <span className="d-none d-sm-inline">
                                        Complete
                                    </span>
                                </Button>

                                <Button
                                    onClick={() => props.startEdit(task)}
                                    variant="main"
                                    className="w-25"
                                    size="sm"
                                >
                                    <FontAwesomeIcon
                                        className="mb-1 mr-sm-1"
                                        icon={["fas", "edit"]}
                                    />
                                    <span className="d-none d-sm-inline">
                                        Edit
                                    </span>
                                </Button>

                                <Button
                                    onClick={() => props.deleteItem(task)}
                                    variant="remove"
                                    className="w-25"
                                    size="sm"
                                >
                                    <FontAwesomeIcon
                                        className="mb-1 mr-sm-1"
                                        icon={["fas", "trash"]}
                                    />
                                    <span className="d-none d-sm-inline">
                                        Remove
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Tasks;
