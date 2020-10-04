import React, { useRef, useState } from "react";
import { Alert, Form, Container, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PasswordReset = (props) => {
    const [status, setStatus] = useState(undefined);
    const [variant, setVariant] = useState("danger");
    const form = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = "/accounts/password/reset/";

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
        document.getElementById("password-reset-form").reset();
    };

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <div className="ccard bg-main-bg" style={{ minWidth: "28rem" }}>
                <div className="px-4 pt-4 pb-3 text-center">
                    <h5 className="card-title mb-4">Reset Password</h5>

                    <Form
                        id="password-reset-form"
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
                                        icon={["fas", "envelope"]}
                                    />
                                </span>
                            </div>
                            <input
                                required
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Account Email..."
                            />
                        </div>

                        <div className="mt-4 d-flex justify-content-around">
                            <div className="form-group">
                                <Button type="submit" variant="main">
                                    Reset Password
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

export default PasswordReset;
