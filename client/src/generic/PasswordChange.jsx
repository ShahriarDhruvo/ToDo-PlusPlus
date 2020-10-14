import React, { useRef, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomAlert from "./CustomAlert";

const PasswordChange = (props) => {
    const [status, setStatus] = useState(undefined);
    const [variant, setVariant] = useState("danger");
    const form = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = "/accounts/password/change/";

        const loadData = async () => {
            const formData = new FormData(form.current);

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (response.ok) setVariant("success");

                setStatus(data[Object.keys(data)[0]]);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
        document.getElementById("password-change-form").reset();
    };

    return (
        <Container className="vertical-center">
            <div className="ccard bg-main-bg">
                <div className="p-4 text-center">
                    <h5 className="mb-4">Change Password</h5>

                    <Form
                        ref={form}
                        className="row px-2 px-sm-4"
                        onSubmit={handleSubmit}
                        id="password-change-form"
                        style={{ maxWidth: "28rem" }}
                    >
                        <div className="mx-auto">
                            {status && (
                                <CustomAlert
                                    status={status}
                                    variant={variant}
                                />
                            )}
                        </div>

                        <div className="my-3 d-flex w-100">
                            <span className="ccard__input-prepend">
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "lock"]}
                                />
                            </span>

                            <input
                                required
                                type="password"
                                name="old_password"
                                placeholder="Old password"
                                className="ccard__input pl-2"
                                onChange={() => setStatus("")}
                            />
                        </div>

                        <div className="my-3 d-flex w-100">
                            <span className="ccard__input-prepend">
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "lock"]}
                                />
                            </span>

                            <input
                                required
                                type="password"
                                name="new_password1"
                                placeholder="New password"
                                className="ccard__input pl-2"
                                onChange={() => setStatus("")}
                            />
                        </div>

                        <div className="my-3 d-flex w-100">
                            <span className="ccard__input-prepend">
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "lock"]}
                                />
                            </span>

                            <input
                                required
                                type="password"
                                name="new_password2"
                                placeholder="Repeat password"
                                className="ccard__input pl-2"
                                onChange={() => setStatus("")}
                            />
                        </div>

                        <div className="mt-4 d-flex mx-auto">
                            <div className="mr-3">
                                <Button size="sm" type="submit" variant="main">
                                    <FontAwesomeIcon
                                        className="mb-1 mr-2"
                                        icon={["fa", "key"]}
                                    />
                                    Change Password
                                </Button>
                            </div>

                            <div>
                                <Button
                                    size="sm"
                                    variant="outline-main"
                                    onClick={() => props.history.goBack()}
                                >
                                    <FontAwesomeIcon
                                        className="mb-1 mr-2"
                                        icon={["fa", "chevron-left"]}
                                    />
                                    Go Back
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </Container>
    );
};

export default PasswordChange;
