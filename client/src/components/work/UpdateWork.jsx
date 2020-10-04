import React, { useState, useEffect, useRef } from "react";
import { Form, Alert, Button, Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

const UpdateWork = (props) => {
    const [error, setError] = useState(undefined);
    const [title, setTitle] = useState("");
    const [works, setWorks] = useState([]);
    const form = useRef(null);

    const params = useParams();

    useEffect(() => {
        const API_URL = "/work/list/";

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            setWorks(data);
        };

        // if (token) loadData();
        loadData();

        const API_URL_2 = "/work/details/" + params.id;

        const loadData_2 = async () => {
            const response = await fetch(API_URL_2, {
                method: "GET",
                // headers: {
                //     Accept: "application/json",
                //     Authorization: token,
                //     "Content-Type": "application/json",
                // },
            });

            const data = await response.json();

            setTitle(data[0].title);
        };

        // if (token) loadData_2();
        loadData_2();
    }, [params.id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (e.target.title.value === "")
            return setError("You can't add an empty work title !!!");

        for (let i = 0; i < works.length; i++) {
            if (works[i].title === e.target.title.value) {
                return setError(
                    "You have already added a similar work title..."
                );
            }
        }

        const API_URL = "/work/update/" + params.id;

        const loadData = async () => {
            try {
                fetch(API_URL, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: e.target.title.value,
                    }),
                });

                // Try to create a universal error to handle all this kind of shits
                // const data = await response.json();

                // if (!response.ok) setError(data.title);
            } catch (error) {
                // setError(error);
            }
        };

        loadData();
        props.history.push("/");
    };

    return (
        <Container className="vertical-center">
            <div className="ccard card-body text-center w-100 bg-main-bg">
                <h4 className="mb-4">Update Work Information</h4>

                <Form ref={form} onSubmit={handleSubmit}>
                    <div className="text-center">
                        {error && <Alert variant="danger">{error}</Alert>}
                    </div>
                    <Form.Group>
                        <Form.Label>Work title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            defaultValue={title}
                            placeholder="Work title..."
                        />
                        <Form.Text className="text-muted">
                            Update the work's title
                        </Form.Text>
                    </Form.Group>

                    <div className="mt-4 d-flex justify-content-around">
                        <Button
                            as={Link}
                            variant="main"
                            type="submit"
                            className="w-25"
                            to={"/add/collaborator/" + params.id}
                        >
                            Add Collaborator
                        </Button>

                        <Button variant="main" type="submit" className="w-25">
                            Update
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

export default UpdateWork;
