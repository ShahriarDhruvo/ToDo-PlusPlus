import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Form } from "react-bootstrap";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import LoadingScreen from "../../generic/LoadingScreen";
import CustomAlert from "../../generic/CustomAlert";

const Login = () => {
    const form = useRef(null);
    const [status, setStatus] = useState(undefined);
    const { promiseInProgress } = usePromiseTracker({ delay: 500 });
    const { handleAuthentication } = useContext(AuthenticationContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = "/api/v1/accounts/login/";

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
                    localStorage.setItem("userID", data.user.pk);
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
        <Container className="vertical-center">
            {promiseInProgress ? (
                <LoadingScreen />
            ) : (
                <div className="ccard p-3 p-sm-4 bg-main-bg">
                    <div className="d-flex justify-content-between mb-4">
                        <div className="w-50">
                            <img
                                alt="profile"
                                className="w-100"
                                src="/static/img/profile_pic.png"
                            />
                        </div>

                        <div className="text-center my-auto">
                            <Link
                                to="/register"
                                className="btn btn-outline-syntax"
                            >
                                Sign up
                            </Link>

                            <div className="my-3">
                                <span style={{ fontSize: "0.7rem" }}>OR</span>
                            </div>

                            <h5 className="card-title">Sign in</h5>
                        </div>
                    </div>

                    <Form ref={form} onSubmit={handleSubmit}>
                        {status && <CustomAlert status={status} />}

                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <div className="mt-2 d-flex">
                                <span className="ccard__input-prepend">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "user"]}
                                    />
                                </span>

                                <input
                                    required
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="ccard__input pl-2"
                                    onChange={() => setStatus("")}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Link
                                className="float-right mr-1"
                                to="/password/reset/"
                            >
                                Forgot?
                            </Link>

                            <Form.Label>Password</Form.Label>
                            <div className="mt-2 d-flex">
                                <span className="ccard__input-prepend">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "lock"]}
                                    />
                                </span>

                                <input
                                    required
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="ccard__input pl-2"
                                    onChange={() => setStatus("")}
                                />
                            </div>
                        </Form.Group>

                        <div className="my-2 text-center">
                            <small className="text-muted">
                                Untill signout you will be logged in for 15 days
                                in this browser
                            </small>
                        </div>

                        <Button
                            type="submit"
                            variant="main"
                            className="mt-2 w-100"
                        >
                            Login
                        </Button>
                    </Form>
                </div>
            )}
        </Container>
    );
};

export default Login;
