import React, { useRef, useState } from "react";
import { Alert, Form, Container, Button } from "react-bootstrap";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingScreen from "./LoadingScreen";

const PasswordReset = (props) => {
    const { promiseInProgress } = usePromiseTracker();
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

        trackPromise(loadData());
        document.getElementById("password-reset-form").reset();
    };

    return (
        <Container className="d-flex align-items-center justify-content-center">
            {promiseInProgress ? (
                <LoadingScreen />
            ) : (
                <div className="ccard bg-main-bg" style={{ minWidth: "28rem" }}>
                    <div className="p-4 text-center">
                        {status ? (
                            <Alert className="m-0" variant={variant}>
                                {status}
                            </Alert>
                        ) : (
                            <Form
                                id="password-reset-form"
                                ref={form}
                                onSubmit={handleSubmit}
                            >
                                <h5 className="card-title mb-4">
                                    Reset Password
                                </h5>

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
                                    <Button type="submit" variant="main">
                                        Reset Password
                                    </Button>
                                    <Button
                                        variant="main"
                                        onClick={() => props.history.goBack()}
                                    >
                                        Go Back
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </div>
                </div>
            )}
        </Container>
    );
};

export default PasswordReset;
