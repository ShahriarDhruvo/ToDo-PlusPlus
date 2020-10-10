import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import CustomModal from "../../generic/Modal";
import CustomAlert from "../../generic/CustomAlert";

const Works = (props) => {
    const [status, setStatus] = useState(undefined);
    const [showButtons, setShowButtons] = useState({});

    const markAsCompleted = (work) => {
        const completed = !work.completed;
        const API_URL = `/work/update/${work.id}`;

        const loadData = async () => {
            try {
                fetch(API_URL, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
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
                setStatus(error);
            }
        };

        loadData();
    };

    const deleteItem = (id) => {
        const API_URL = `/work/delete/${id}`;

        const loadData = async () => {
            fetch(API_URL, {
                method: "DELETE",
            });

            props.updateFlag();
        };

        loadData();
    };

    const toggleButtons = (id) => {
        setShowButtons((prevShownComments) => ({
            ...prevShownComments,
            [id]: !prevShownComments[id],
        }));
    };

    const breakpointColsObj = {
        default: 4,
        1200: 3,
        992: 3,
        768: 2,
        576: 1,
    };

    let i = 0;
    const colors = ["#fc85ae"];

    return (
        <>
            {props.works.length ? (
                <>
                    {status && (
                        <CustomAlert status={status} alertClass="mx-2" />
                    )}
                    
                    <Masonry
                        breakpointCols={breakpointColsObj}
                        className="d-flex text-center"
                        columnClassName="mx-2"
                    >
                        {props.works.map((work, index) => (
                            <div
                                key={index}
                                className={`ccard card__hover my-3 ${
                                    work.completed
                                        ? "bg-complete-bg"
                                        : "bg-main-bg"
                                }`}
                                style={{ borderTop: `4px solid ${colors[i]}` }}
                            >
                                <div className="px-3 pt-3">
                                    {!work.completed ? (
                                        <span>{work.title}</span>
                                    ) : (
                                        <strike>{work.title}</strike>
                                    )}
                                </div>

                                <div onClick={() => toggleButtons(index)}>
                                    {showButtons[index] ? (
                                        <FontAwesomeIcon
                                            className="mt-1 mb-2"
                                            icon={["fas", "caret-up"]}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            className="mt-1 mb-2"
                                            icon={["fas", "caret-down"]}
                                        />
                                    )}

                                    {showButtons[index] && (
                                        <div className="card-footer dropdown_menu">
                                            <Button
                                                size="sm"
                                                variant="complete"
                                                onClick={() =>
                                                    markAsCompleted(work)
                                                }
                                                variant={
                                                    work.completed
                                                        ? "c-info"
                                                        : "complete"
                                                }
                                                className="work-btn mx-1 my-2 dropdown_item-1"
                                            >
                                                {!work.completed ? (
                                                    <>
                                                        <FontAwesomeIcon
                                                            className="mb-1"
                                                            icon={[
                                                                "fas",
                                                                "check",
                                                            ]}
                                                        />
                                                        {/* <span className="d-none d-sm-inline">
                                                        Complete
                                                    </span> */}
                                                    </>
                                                ) : (
                                                    <>
                                                        <FontAwesomeIcon
                                                            className="mb-1"
                                                            icon={["fa", "ban"]}
                                                        />
                                                        {/* <span className="d-none d-sm-inline">
                                                        Incomplete
                                                    </span> */}
                                                    </>
                                                )}
                                            </Button>

                                            <Button
                                                size="sm"
                                                as={Link}
                                                variant="c-secondary"
                                                to={"/work/details/" + work.id}
                                                className="work-btn mx-1 my-2 dropdown_item-2"
                                            >
                                                <FontAwesomeIcon
                                                    className="mb-1"
                                                    icon={["fas", "info"]}
                                                />
                                                {/* <span className="d-none d-sm-inline">
                                                Details
                                            </span> */}
                                            </Button>

                                            <Button
                                                size="sm"
                                                as={Link}
                                                variant="main"
                                                to={`/${work.id}/task/list/`}
                                                className="work-btn mx-1 my-2 dropdown_item-3"
                                            >
                                                <FontAwesomeIcon
                                                    className="mb-1"
                                                    icon={["fas", "tasks"]}
                                                />
                                                {/* <span className="d-none d-sm-inline">
                                                Tasks
                                            </span> */}
                                            </Button>

                                            <CustomModal
                                                variant="remove"
                                                modalTitle="Delete"
                                                actionButtonSize="sm"
                                                actionVariant="danger"
                                                actionButtonClass="work-btn mx-1 my-2 dropdown_item-4"
                                                // actionButtonWidth="3rem"
                                                handleAction={() =>
                                                    deleteItem(work.id)
                                                }
                                                modalBody={`Do you really want to delete "${work.title}" work?`}
                                            >
                                                <FontAwesomeIcon
                                                    className="mb-1"
                                                    icon={["fas", "trash"]}
                                                />
                                                {/* <span className="d-none d-sm-inline">
                                                Remove
                                            </span> */}
                                            </CustomModal>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Masonry>
                </>
            ) : (
                <CustomAlert
                    variant="info"
                    status="Your work list is empty!"
                    alertClass="mx-2"
                />
            )}
        </>
    );
};

export default Works;
