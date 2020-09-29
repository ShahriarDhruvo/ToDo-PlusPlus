import React, { useRef, useState } from "react";
import { Alert, Form, Container, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";

const Register = (props) => {
    const [status, setStatus] = useState(undefined);
    const form = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = "/user/registration/";

        const loadData = async () => {
            const formData = new FormData(form.current);

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                console.log(data);
                if (!response.ok) setStatus(data[Object.keys(data)[0]]);
                else props.history.push("/confirm-email");
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    };

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <div className="ccard bg-main-bg" style={{ maxWidth: "28rem" }}>
                <div className="p-4 text-center">
                    <h5 className="card-title">Create an Account</h5>
                    <span>Get started with your free account</span>

                    <Button
                        disabled
                        size="sm"
                        variant="twitter"
                        className="mt-3 mb-2 w-100"
                    >
                        <FontAwesomeIcon
                            className="mb-1 mr-2"
                            icon={faTwitter}
                        />
                        Signup via Twitter
                    </Button>

                    <Button
                        disabled
                        size="sm"
                        variant="facebook"
                        className="w-100"
                    >
                        <FontAwesomeIcon
                            className="mb-1 mr-2"
                            icon={faFacebook}
                        />
                        Signup via facebook
                    </Button>

                    <div className="my-3 divider-text">
                        <span className="px-4 bg-main-bg">OR</span>
                    </div>

                    <Form ref={form} onSubmit={handleSubmit}>
                        <div className="text-center">
                            {status && (
                                <Alert variant="danger">
                                    {/* <pre>{JSON.stringify(status)}</pre> */}
                                    {status}
                                </Alert>
                            )}
                        </div>

                        <div className="form-group input-group">
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
                                className="form-control"
                                placeholder="Username"
                            />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["far", "user"]}
                                    />
                                </span>
                            </div>
                            <input
                                type="text"
                                name="first_name"
                                className="form-control"
                                placeholder="First name"
                            />
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["far", "user"]}
                                    />
                                </span>
                            </div>
                            <input
                                type="text"
                                name="last_name"
                                className="form-control"
                                placeholder="Last name"
                            />
                        </div>

                        <div className="mb-3">
                            <small className="text-muted">
                                For a cool display name provide first & last
                                name
                            </small>
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
                                placeholder="Email address"
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
                                name="password1"
                                className="form-control"
                                placeholder="Create password"
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
                                name="password2"
                                className="form-control"
                                placeholder="Repeat password"
                            />
                        </div>

                        <div className="form-group">
                            <Button
                                type="submit"
                                variant="main"
                                className="w-100"
                            >
                                Create Account
                            </Button>
                        </div>

                        <div>
                            Have an account? <Link to="/login">Log In</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </Container>
    );
};

export default Register;
