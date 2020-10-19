import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../../generic/Modal";
import UpdateTask from "./UpdateTask";
import RemainingTime from "../../generic/RemainingTime";
import CustomAlert from "../../generic/CustomAlert";

const Tasks = (props) => {
    const [edit, setEdit] = useState({
        id: null,
        status: false,
    });
    const [status, setStatus] = useState(props.status);
    const [showButtons, setShowButtons] = useState({});
    const [variant, setVariant] = useState(props.variant);

    const markAsCompleted = (task) => {
        const completed = !task.completed;
        const API_URL = `/api/v1/${props.wid}/task/update/${task.id}`;

        const loadData = async () => {
            try {
                const formData = new FormData();
                formData.append("completed", completed);

                const response = await fetch(API_URL, {
                    method: "PATCH",
                    body: formData,
                });

                const data = await response.json();

                if (response.status === 404) {
                    setVariant("info");
                    setStatus(data.detail);
                } else if (response.status === 403) setStatus(data.detail);
                // else props.updateFlag();
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
        props.updateFlag();
    };

    const toggleEdit = (id, status) => {
        setEdit({ id, status });
    };

    const deleteItem = (id) => {
        const API_URL = `/api/v1/${props.wid}/task/delete/${id}`;

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "DELETE",
            });

            if (response.status === 404) {
                setVariant("info");
                setStatus("Item not found");
            } else if (response.status === 403)
                setStatus("You are not authorized to delete this item");
            // else props.updateFlag();
        };

        loadData();
        props.updateFlag();
    };

    const toggleButtons = (id) => {
        setShowButtons((prevShownComments) => ({
            ...prevShownComments,
            [id]: !prevShownComments[id],
        }));
    };

    return (
        <>
            {props.tasks.length ? (
                <div className="row text-center">
                    {status && (
                        <CustomAlert variant={variant} status={status} />
                    )}

                    {props.tasks.map((task, index) => (
                        <div key={index} className="col-12 align-self-center">
                            <div
                                className={
                                    "ccard my-1 " +
                                    (task.completed
                                        ? "bg-complete-bg"
                                        : "bg-main-bg")
                                }
                            >
                                {!(edit.status && edit.id === task.id) ? (
                                    <>
                                        <div
                                            onClick={() => toggleButtons(index)}
                                            className="card-body"
                                        >
                                            <div>
                                                {!task.completed ? (
                                                    <>
                                                        <span>
                                                            {task.title}
                                                        </span>
                                                        <div
                                                            style={{
                                                                fontStyle:
                                                                    "italic",
                                                            }}
                                                        >
                                                            <small className="text-muted">
                                                                {task.author}
                                                            </small>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <strike>
                                                            {task.title}
                                                        </strike>
                                                        <div
                                                            style={{
                                                                fontStyle:
                                                                    "italic",
                                                            }}
                                                        >
                                                            <small className="text-muted">
                                                                {task.author}
                                                            </small>
                                                        </div>
                                                    </>
                                                )}

                                                {task.haveDeadline && (
                                                    <small>
                                                        {/* <b>Deadline: </b>
                                                            {Moment(
                                                                task.deadline
                                                            ).format(
                                                                "MMM DD, YY "
                                                            )}
                                                            at
                                                            {Moment(
                                                                task.deadline
                                                            ).format(
                                                                " hh:mm a"
                                                            )} */}
                                                        <RemainingTime
                                                            deadline={
                                                                task.deadline
                                                            }
                                                        />
                                                    </small>
                                                )}
                                            </div>
                                        </div>

                                        {showButtons[index] && (
                                            <div className="card-footer dropdown_menu">
                                                <div className="row">
                                                    <div className="col-12 col-md-4">
                                                        <Button
                                                            onClick={() =>
                                                                markAsCompleted(
                                                                    task
                                                                )
                                                            }
                                                            variant={
                                                                task.completed
                                                                    ? "c-info"
                                                                    : "complete"
                                                            }
                                                            className="dropdown_item-1"
                                                            style={{
                                                                minWidth:
                                                                    "8rem",
                                                            }}
                                                            disabled={
                                                                edit.status
                                                            }
                                                            size="sm"
                                                        >
                                                            {!task.completed ? (
                                                                <>
                                                                    <FontAwesomeIcon
                                                                        className="mr-1"
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
                                                                        className="mr-1"
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

                                                    <div className="col-12 col-md-4">
                                                        <Button
                                                            size="sm"
                                                            variant="edit-tasks"
                                                            className="my-2 my-md-0 dropdown_item-2"
                                                            style={{
                                                                minWidth:
                                                                    "8rem",
                                                            }}
                                                            disabled={
                                                                edit.status
                                                            }
                                                            onClick={() =>
                                                                toggleEdit(
                                                                    task.id,
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                className="mr-1"
                                                                icon={[
                                                                    "fas",
                                                                    "edit",
                                                                ]}
                                                            />
                                                            {/* <span className="d-none d-sm-inline"> */}
                                                            Edit
                                                            {/* </span> */}
                                                        </Button>
                                                    </div>

                                                    <div className="col-12 col-md-4">
                                                        <CustomModal
                                                            edit={edit.status}
                                                            variant="remove"
                                                            modalTitle="Delete"
                                                            actionButtonSize="sm"
                                                            actionVariant="danger"
                                                            actionButtonWidth="8rem"
                                                            actionButtonClass="dropdown_item-3"
                                                            handleAction={() =>
                                                                deleteItem(
                                                                    task.id
                                                                )
                                                            }
                                                            modalBody="Do you really want to delete this task?"
                                                        >
                                                            <FontAwesomeIcon
                                                                className="mr-1"
                                                                icon={[
                                                                    "fas",
                                                                    "trash",
                                                                ]}
                                                            />
                                                            {/* <span className="d-none d-sm-inline"> */}
                                                            Remove
                                                            {/* </span> */}
                                                        </CustomModal>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <UpdateTask
                                        task={task}
                                        tasks={props.tasks}
                                        wid={task.work_name}
                                        toggleEdit={toggleEdit}
                                        updateFlag={props.updateFlag}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CustomAlert variant="info" status="Your task list is empty!" />
            )}
        </>
    );
};

export default Tasks;
