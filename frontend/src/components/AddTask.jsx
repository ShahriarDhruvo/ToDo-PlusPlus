import React, { useState } from "react";
import { Button, Form, InputGroup, Alert } from "react-bootstrap";

const AddTask = (props) => {
    const [error, setError] = useState(undefined);

    const handleSubmit = (e) => {
        e.preventDefault();
        // setError(props.handleSubmit(e));
    };

    return (
        <div className="card-body mb-2 bg-main-bg crounded cborder">
            <Form onSubmit={handleSubmit}>
                <div className="text-center">
                    {error && <Alert variant="danger">{error}</Alert>}
                </div>

                <InputGroup>
                    <Form.Control
                        onChange={props.handleChange}
                        className="rounded mr-2"
                        type="text"
                        value={props.title}
                        placeholder="Add task..."
                    />
                    <Button variant="main" type="submit">
                        Add Task
                    </Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default AddTask;
