import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Button, Form, InputGroup } from "react-bootstrap";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import LoadingScreen from "../../generic/LoadingScreen";

const Login = () => {
    const { promiseInProgress } = usePromiseTracker();
    const [status, setStatus] = useState(undefined);
    const { handleAuthentication } = useContext(AuthenticationContext);
    const form = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = "/accounts/login/";

        const loadData = async () => {
            const formData = new FormData(form.current);

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok) setStatus(data.non_field_errors);
                else {
                    handleAuthentication("Yes");
                    window.location.replace("/");
                }
            } catch (error) {
                setStatus(error);
            }
        };

        trackPromise(loadData());
    };

    return (
        <Container className="d-flex align-items-center justify-content-center">
            {promiseInProgress ? (
                <LoadingScreen />
            ) : (
                <div className="ccard p-5 bg-main-bg">
                    <div className="d-flex justify-content-between mb-4">
                        <div className="w-50">
                            <img
                                src="/img/profile_pic.png"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/img/Default.png";
                                }}
                                alt="profile"
                                className="w-100"
                            />
                        </div>

                        <div className="text-center my-auto">
                            <Link
                                to="/register"
                                className="btn btn-outline-syntax"
                            >
                                Sign up
                            </Link>
                            <div className="my-3 text-center divider-text">
                                <span className="px-3 bg-main-bg">OR</span>
                            </div>
                            <h5 className="card-title">Sign in</h5>
                        </div>
                    </div>

                    <Form ref={form} onSubmit={handleSubmit}>
                        <div className="text-center">
                            {status && <Alert variant="danger">{status}</Alert>}
                        </div>

                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <InputGroup>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <FontAwesomeIcon
                                            className="fa-icon"
                                            icon={["fas", "user"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    required
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="form-control"
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Link
                                className="float-right mr-1"
                                to="/password/reset/"
                            >
                                Forgot?
                            </Link>

                            <Form.Label>Password</Form.Label>
                            <InputGroup>
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
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <div className="checkbox">
                                <input type="checkbox" />
                                <Form.Label className="ml-1">
                                    Save password
                                </Form.Label>
                            </div>
                        </Form.Group>

                        <Button type="submit" variant="main" className="w-100">
                            Login
                        </Button>
                    </Form>
                </div>
            )}
        </Container>
    );
};

export default Login;
