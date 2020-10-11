import React, { useState } from "react";
import { Alert, Container, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PassworResetConfirm = (props) => {
    const [status, setStatus] = useState(undefined);
    const [variant, setVariant] = useState("danger");
    const params = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = "/accounts/password/reset/confirm/";

        const loadData = async () => {
            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        new_password1: e.target.new_password1.value,
                        new_password2: e.target.new_password2.value,
                        uid: params.uid,
                        token: params.token,
                    }),
                });

                const data = await response.json();

                if (response.ok) setVariant("success");

                setStatus(data[Object.keys(data)[0]]);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
        document.getElementById("password-reset-form").reset();
    };

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <div className="ccard bg-main-bg" style={{ minWidth: "28rem" }}>
                <div className="px-4 pt-4 pb-3 text-center">
                    <h5 className="card-title mb-4">Reset Password</h5>

                    <Form id="password-reset-form" onSubmit={handleSubmit}>
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
                                    <FontAwesomeIcon
                                        className="mb-1 mr-2"
                                        icon={["fa", "window-restore"]}
                                    />
                                    Reset Password
                                </Button>
                            </div>
                            <div className="form-group">
                                <Button
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

export default PassworResetConfirm;
