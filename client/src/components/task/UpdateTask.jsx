import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomAlert from "../../generic/CustomAlert";

const UpdateTask = (props) => {
    const [status, setStatus] = useState(undefined);
    const [haveDeadline, setHaveDeadline] = useState(props.task.haveDeadline);

    const form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let i = 0; i < props.tasks.length; i++) {
            if (
                props.tasks[i].id !== props.task.id &&
                props.tasks[i].title === e.target.title.value
            ) {
                return setStatus(
                    "You have already added a similar work title..."
                );
            }
        }

        const deadline =
            haveDeadline && e.target.date.value && e.target.time.value
                ? `${e.target.date.value}T${e.target.time.value}`
                : `${new Date().toLocaleDateString(
                      "en-CA"
                  )}T${new Date().toLocaleTimeString("en-US", {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                  })}:00`;

        const API_URL = `/${props.wid}/task/update/${props.task.id}`;

        const loadData = async () => {
            try {
                const formData = new FormData();
                formData.append("deadline", deadline);
                formData.append("haveDeadline", haveDeadline);
                formData.append("title", e.target.title.value);

                const response = await fetch(API_URL, {
                    method: "PATCH",
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok) setStatus(data.detail);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();

        props.updateFlag();
        props.toggleEdit({ id: null, status: false });
    };

    return (
        <Form ref={form} onSubmit={handleSubmit}>
            <div className="card-body">
                {status && <CustomAlert status={status} />}

                <Form.Label>Task Title</Form.Label>
                <div className="d-flex mt-3">
                    <input
                        required
                        type="text"
                        name="title"
                        placeholder="Task..."
                        defaultValue={props.task.title}
                        onChange={() => setStatus("")}
                        className="ccard__input pl-2"
                    />
                </div>

                {haveDeadline ? (
                    <>
                        <Form.Check
                            defaultChecked
                            type="checkbox"
                            label="Deadline"
                            name="haveDeadline"
                            className="mt-3 mb-2"
                            onClick={() => setHaveDeadline(!haveDeadline)}
                        />
                        <div className="form-inline justify-content-center mt-3">
                            <div className="d-flex">
                                <input
                                    type="date"
                                    name="date"
                                    placeholder="Task..."
                                    defaultValue={
                                        props.task.deadline.split("T")[0]
                                    }
                                    className="ccard__input pl-2 mr-sm-2 mb-2 mb-md-0"
                                    style={{ maxWidth: "9rem" }}
                                />
                            </div>

                            <div className="d-flex">
                                <input
                                    type="time"
                                    name="time"
                                    placeholder="Task..."
                                    defaultValue={
                                        props.task.deadline.split("T")[1]
                                    }
                                    className="ccard__input pl-2 mb-2 mb-md-0"
                                />
                            </div>
                        </div>

                        <Form.Text className="text-muted">
                            Safari browser is not supported for editing deadline
                        </Form.Text>
                    </>
                ) : (
                    <>
                        <Form.Check
                            type="checkbox"
                            label="Add Deadline"
                            name="haveDeadline"
                            className="mt-3"
                            onClick={() => setHaveDeadline(!haveDeadline)}
                        />
                    </>
                )}
            </div>

            <div className="card-footer justify-content-around">
                <Button
                    size="sm"
                    type="submit"
                    variant="main"
                    style={{ minWidth: "8rem" }}
                >
                    <FontAwesomeIcon
                        className="mb-1 mr-1"
                        icon={["fa", "wrench"]}
                    />
                    Update
                </Button>
            </div>
        </Form>
    );
};

export default UpdateTask;
