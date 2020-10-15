import React, { useState, useEffect, useContext, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CustomAlert from "../../generic/CustomAlert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";

const UpdateWork = (props) => {
    const form = useRef(null);
    const [title, setTitle] = useState("");
    const [works, setWorks] = useState([]);
    const [status, setStatus] = useState("");
    const [variant, setVariant] = useState("danger");

    const { handleLogOut } = useContext(AuthenticationContext);

    const params = useParams();

    useEffect(() => {
        let API_URL = "/work/list/";

        const loadData = async () => {
            let response = await fetch(API_URL, {
                method: "GET",
            });

            if (response.status === 401) handleLogOut();

            let data = await response.json();

            setWorks(data);

            API_URL = "/work/details/" + params.id;
            response = await fetch(API_URL, {
                method: "GET",
            });

            data = await response.json();

            setTitle(data[0].title);
        };

        loadData();
    }, [params.id, handleLogOut]);

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let i = 0; i < works.length; i++) {
            if (
                works[i].id.toString() === params.id &&
                works[i].title === e.target.title.value
            ) {
                setVariant("info");
                return setStatus("Your work title is unchanged.");
            } else if (works[i].title === e.target.title.value) {
                setVariant("danger");
                return setStatus(
                    "You have already added a similar work title..."
                );
            }
        }

        const API_URL = "/work/update/" + params.id;

        const loadData = async () => {
            try {
                const response = await fetch(API_URL, {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: e.target.title.value,
                    }),
                });

                if (response.ok) {
                    setVariant("success");
                    setStatus("Work title has been updated successfully.");
                }
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
        // props.history.push("/");
    };

    return (
        <Container className="vertical-center">
            <div className="col ccard p-4 text-center bg-main-bg" style={{ maxWidth: "28rem" }}>
                <h5 className="clogo mb-5">Update Work Information</h5>

                <Form ref={form} onSubmit={handleSubmit}>
                    <Form.Group>
                        {status && (
                            <CustomAlert variant={variant} status={status} />
                        )}

                        <div className="d-flex mt-4">
                            <input
                                required
                                type="text"
                                name="title"
                                defaultValue={title}
                                placeholder="Work title..."
                                onChange={() => setStatus("")}
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
