import React, { useState, useRef } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

import CustomAlert from "../../generic/CustomAlert";

const AddTask = (props) => {
    const [status, setStatus] = useState(undefined);
    const [haveDeadline, setHaveDeadline] = useState(false);
    const form = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let i = 0; i < props.tasks.length; i++) {
            if (props.tasks[i].title === e.target.title.value) {
                return setStatus("You have already added a similar task...");
            }
        }

        e.target.deadline.value = haveDeadline
            ? `${e.target.date.value}T${e.target.time.value}:00`
            : `${new Date().toLocaleDateString(
                  "en-CA"
              )}T${new Date().toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
              })}:00`;

        const API_URL = `/${props.wid}/task/create/`;

        const loadData = async () => {
            const formData = new FormData(form.current);

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok) setStatus(data.detail);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
        setStatus(null);
        props.updateFlag();
        setHaveDeadline(false);
        document.getElementById("Add_Task_Form").reset();
    };

    return (
        <div className="text-center mt-5 mb-4">
            <Form id="Add_Task_Form" ref={form} onSubmit={handleSubmit}>
                {status && <CustomAlert status={status} />}

                <InputGroup>
                    <input
                        required
                        type="text"
                        name="title"
                        placeholder="Add task..."
                        onChange={() => setStatus("")}
                        className="ccard__input mr-3 pl-2"
                    />

                    <Button size="sm" variant="main" type="submit">
                        Add Task
                    </Button>
                </InputGroup>

                <input type="hidden" name="deadline" />

                {haveDeadline ? (
                    <>
                        <Form.Check
                            type="checkbox"
                            label="Deadline"
                            name="haveDeadline"
                            className="mt-3 mb-2"
                            onClick={() => setHaveDeadline(!haveDeadline)}
                        />
                        <div className="form-inline justify-content-center">
                            <Form.Control
                                type="date"
                                name="date"
                                className="mr-sm-2 mb-2 mb-md-0"
                                defaultValue={new Date().toLocaleDateString(
                                    "en-CA"
                                )}
                            />
                            <Form.Control
                                type="time"
                                name="time"
                                defaultValue={new Date().toLocaleTimeString(
                                    "en-US",
                                    {
                                        hour12: false,
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}
                            />
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
            </Form>
        </div>
    );
};

export default AddTask;
