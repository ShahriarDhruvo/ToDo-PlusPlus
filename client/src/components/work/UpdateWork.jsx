import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CustomAlert from "../../generic/CustomAlert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

        loadData();

        const API_URL_2 = "/work/details/" + params.id;

        const loadData_2 = async () => {
            const response = await fetch(API_URL_2, {
                method: "GET",
            });

            const data = await response.json();

            setTitle(data[0].title);
        };

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
            <div className="ccard p-4 text-center w-100 bg-main-bg">
                <h5 className="clogo mb-5">Update Work Information</h5>

                <Form ref={form} onSubmit={handleSubmit}>
                    <Form.Group>
                        {error && (
                            <CustomAlert variant="danger" status={error} />
                        )}

                        <div className="d-flex mt-4">
                            <input
                                required
                                type="text"
                                name="title"
                                defaultValue={title}
                                placeholder="Work title..."
                                onChange={() => setError("")}
                                className="ccard__input pl-2"
                            />
                        </div>

                        <Form.Text className="text-muted">
                            Update the work's title
                        </Form.Text>
                    </Form.Group>

                    <div className="mt-4 d-flex justify-content-around">
                        <Button
                            size="sm"
                            variant="main"
                            type="submit"
                            className="my-2"
                            style={{ minWidth: "7rem" }}
                        >
                            <FontAwesomeIcon
                                className="mb-1 mr-2"
                                icon={["fa", "wrench"]}
                            />
                            Update
                        </Button>

                        <Button
                            size="sm"
                            variant="outline-main"
                            type="submit"
                            className="my-2"
                            style={{ minWidth: "7rem" }}
                            onClick={() => props.history.goBack()}
                        >
                            <FontAwesomeIcon
                                className="mb-1 mr-2"
                                icon={["fa", "chevron-left"]}
                            />
                            Go Back
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default UpdateWork;
