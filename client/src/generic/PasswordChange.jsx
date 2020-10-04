import React, { useRef, useState } from "react";
import { Alert, Form, Container, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <Container className="d-flex align-items-center justify-content-center">
            <div className="ccard bg-main-bg" style={{ minWidth: "28rem" }}>
                <div className="px-4 pt-4 pb-3 text-center">
                    <h5 className="card-title mb-4">Change Password</h5>

                    <Form
                        id="password-change-form"
                        ref={form}
                        onSubmit={handleSubmit}
                    >
                        <div className="text-center">
                            {status && (
                                <Alert variant={variant}>{status}</Alert>
                            )}
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "lock"]}
                                    />
                                </span>
                            </div>
                            <input
                                required
                                type="password"
                                name="old_password"
                                className="form-control"
                                placeholder="Old password"
                            />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "lock"]}
                                    />
                                </span>
                            </div>
                            <input
                                required
                                type="password"
                                name="new_password1"
                                className="form-control"
                                placeholder="New password"
                            />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "lock"]}
                                    />
                                </span>
                            </div>
                            <input
                                required
                                type="password"
                                name="new_password2"
                                className="form-control"
                                placeholder="Repeat password"
                            />
                        </div>

                        <div className="mt-4 d-flex justify-content-around">
                            <div className="form-group">
                                <Button type="submit" variant="main">
                                    Change Password
                                </Button>
                            </div>
                            <div className="form-group">
                                <Button
                                    variant="main"
                                    onClick={() => props.history.goBack()}
                                >
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
