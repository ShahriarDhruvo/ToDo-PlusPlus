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
        const API_URL = `/api/v1/work/update/${work.id}`;

        const loadData = async () => {
            try {
                const formData = new FormData();
                formData.append("completed", completed);

                fetch(API_URL, {
                    method: "PATCH",
                    body: formData,
                });

                props.updateFlag();
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    };

    const deleteItem = (id) => {
        const API_URL = `/api/v1/work/delete/${id}`;

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "DELETE",
            });

            if (!response.ok) {
                const data = await response.json();
                setStatus(data.detail);
            }

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

    // const colors = [
    //     "#fc85ae",
    //     "#9c1de7",
    //     "#88bef5",
    //     "#482ff7",
    //     "#cb3b3b",
    //     "#b31e6f",
    //     "#22eaaa",
    //     "#2d6cdf",
    // ];

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
                                // style={{
                                //     borderTop: `4px solid ${colors[index % colors.length]}`,
                                // }}
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
                                </div>

                                {showButtons[index] && (
                                    <div className="card-footer dropdown_menu">
                                        <div className="row">
                                            <div className="col-12">
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        markAsCompleted(work)
                                                    }
                                                    variant={
                                                        work.completed
                                                            ? "c-info"
                                                            : "complete"
                                                    }
                                                    className="mb-2 dropdown_item-1"
                                                    style={{ minWidth: "8rem" }}
                                                >
                                                    {!work.completed ? (
                                                        <>
                                                            <FontAwesomeIcon
                                                                className="mb-1 mr-1"
                                                                icon={[
                                                                    "fas",
                                                                    "check",
                                                                ]}
                                                            />
                                                            {/* <span className="d-none d-sm-inline"> */}
                                                            Complete
                                                            {/* </span> */}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FontAwesomeIcon
                                                                className="mb-1 mr-1"
                                                                icon={[
                                                                    "fa",
                                                                    "ban",
                                                                ]}
                                                            />
                                                            {/* <span className="d-none d-sm-inline"> */}
                                                            Incomplete
                                                            {/* </span> */}
                                                        </>
                                                    )}
                                                </Button>
                                            </div>

                                            <div className="col-12">
                                                <Button
                                                    size="sm"
                                                    as={Link}
                                                    variant="c-secondary"
                                                    to={
                                                        "/work/details/" +
                                                        work.id
                                                    }
                                                    className="mb-2 dropdown_item-2"
                                                    style={{ minWidth: "8rem" }}
                                                >
                                                    <FontAwesomeIcon
                                                        className="mb-1 mr-1"
                                                        icon={["fas", "info"]}
                                                    />
                                                    {/* <span className="d-none d-sm-inline"> */}
                                                    Details
                                                    {/* </span> */}
                                                </Button>
                                            </div>

                                            <div className="col-12">
                                                <Button
                                                    size="sm"
                                                    as={Link}
                                                    variant="main"
                                                    to={`/${work.id}/task/list/`}
                                                    className="mb-2 dropdown_item-3"
                                                    style={{ minWidth: "8rem" }}
                                                >
                                                    <FontAwesomeIcon
                                                        className="mb-1 mr-1"
                                                        icon={["fas", "tasks"]}
                                                    />
                                                    {/* <span className="d-none d-sm-inline"> */}
                                                    Tasks
                                                    {/* </span> */}
                                                </Button>
                                            </div>

                                            <div className="col-12">
                                                <CustomModal
                                                    variant="remove"
                                                    modalTitle="Delete"
                                                    actionButtonSize="sm"
                                                    actionVariant="danger"
                                                    actionButtonClass="dropdown_item-4"
                                                    actionButtonWidth="8rem"
                                                    handleAction={() =>
                                                        deleteItem(work.id)
                                                    }
                                                    modalBody={`Do you really want to delete "${work.title}" work?`}
                                                >
                                                    <FontAwesomeIcon
                                                        className="mb-1 mr-1"
                                                        icon={["fas", "trash"]}
                                                    />
                                                    {/* <span className="d-none d-sm-inline"> */}
                                                    Remove
                                                    {/* </span> */}
                                                </CustomModal>
                                            </div>
                                        </div>
                                    </div>
                                )}
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
