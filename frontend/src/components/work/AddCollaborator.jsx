import React, { useState } from "react";
import { Form, Alert, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const AddCollaborator = (props) => {
    const [status, setStatus] = useState(undefined);
    const [variant, setVariant] = useState(undefined);
    const params = useParams();

    const token = "6a3fd094a2902e2b0c7180569fae8dd4e0828ea9";

    const handleSubmit = (e) => {
        e.preventDefault();
        const collaboratorName = e.target.newCollaborator.value;

        if (collaboratorName === "") return setStatus("Field cannot be empty");

        const API_URL = `/work/add/collaborator/${params.id}/${collaboratorName}`;

        const loadData = async () => {
            try {
                const response = await fetch(API_URL, {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        Authorization: "TOKEN " + token,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (response.status === 404) {
                    setVariant("danger");
                    setStatus(data.detail);
                } else if (response.status === 409) {
                    setVariant("info");
                    setStatus(data.detail);
                } else if (response.status === 403) {
                    setVariant("warning");
                    setStatus(data.detail);
                } else if (response.status === 200) {
                    setVariant("success");
                    setStatus(
                        `You have added ${collaboratorName} as a collaborator for this work`
                    );
                }
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    };

    return (
        <Container className="vertical-center">
            <div className="ccard card-body text-center w-100 bg-main-bg">
                <h4 className="mb-4">Add a Collaborator for this work</h4>

                <Form onSubmit={handleSubmit}>
                    <div className="text-center">
                        {status && <Alert variant={variant}>{status}</Alert>}
                    </div>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Collaborator's Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="newCollaborator"
                            placeholder="Name..."
                        />
                        <Form.Text className="text-muted">
                            Collaborator's can read and edit this work
                            information
                        </Form.Text>
                    </Form.Group>

                    <div className="mt-4 d-flex justify-content-around">
                        <Button variant="main" type="submit" className="w-25">
                            Add
                        </Button>

                        <Button
                            variant="main"
                            type="submit"
                            className="w-25"
                            onClick={() => props.history.goBack()}
                        >
                            Go Back
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default AddCollaborator;
