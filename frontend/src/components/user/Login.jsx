import React, { useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { Alert, Container, Button, Form, InputGroup } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { TokenContext } from "../../contexts/TokenContext";

const Login = () => {
    const [status, setStatus] = useState(undefined);
    const { token, handleToken } = useContext(TokenContext);
    const form = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = "/user/login/";

        const loadData = async () => {
            const formData = new FormData(form.current);

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok) setStatus(data.non_field_errors);
                else handleToken("TOKEN " + data.key);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    };

    return (
        <Container className="d-flex align-items-center justify-content-center">
            {token ? <Redirect to="/" /> : null}
            
            <div className="card p-5 bg-main-bg">
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
                        <Link to="/register" className="btn btn-outline-main">
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
                        <Link className="float-right mr-1" to="#">
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
        </Container>
    );
};

export default Login;
