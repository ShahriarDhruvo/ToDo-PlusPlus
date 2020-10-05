import React, { useRef, useState } from "react";
import { Alert, Form, Container, Button, Spinner } from "react-bootstrap";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";

const Register = (props) => {
    const { promiseInProgress } = usePromiseTracker();
    const [status, setStatus] = useState(undefined);
    const [info, setInfo] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
    });
    const form = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = "/accounts/registration/";
        const email = e.target.email.value;

        const loadData = async () => {
            const formData = new FormData(form.current);

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok) setStatus(data[Object.keys(data)[0]]);
                else props.history.push(`/email/confirmation/sent/${email}`);
            } catch (error) {
                setStatus(error);
            }
        };

        trackPromise(loadData());
    };

    return (
        <Container className="d-flex align-items-center justify-content-center">
            {promiseInProgress ? (
                <Spinner animation="border" />
            ) : (
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
                                    <Alert variant="danger">{status}</Alert>
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
                                    value={info.username}
                                    placeholder="Username"
                                    className="form-control"
                                    onChange={(e) =>
                                        setInfo({
                                            ...info,
                                            username: e.target.value,
                                        })
                                    }
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
                                    value={info.first_name}
                                    className="form-control"
                                    placeholder="First name"
                                    onChange={(e) =>
                                        setInfo({
                                            ...info,
                                            first_name: e.target.value,
                                        })
                                    }
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
                                    value={info.last_name}
                                    className="form-control"
                                    placeholder="Last name"
                                    onChange={(e) =>
                                        setInfo({
                                            ...info,
                                            last_name: e.target.value,
                                        })
                                    }
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
                                    value={info.email}
                                    className="form-control"
                                    placeholder="Email address"
                                    onChange={(e) =>
                                        setInfo({
                                            ...info,
                                            email: e.target.value,
                                        })
                                    }
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
            )}
        </Container>
    );
};

export default Register;
