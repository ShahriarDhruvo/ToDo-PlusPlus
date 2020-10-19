import React, { useRef, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";
import LoadingScreen from "../../generic/LoadingScreen";
import CustomAlert from "../../generic/CustomAlert";

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

        const API_URL = "/api/v1/accounts/registration/";
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
        <Container className="vertical-center">
            {promiseInProgress ? (
                <LoadingScreen />
            ) : (
                <div
                    className="col ccard bg-main-bg"
                    style={{ maxWidth: "28rem" }}
                >
                    <div className="p-3 p-sm-4 text-center">
                        <h5 className="card-title">Create an Account</h5>
                        <p className="mb-3" style={{ fontSize: "0.9rem" }}>
                            Get started with your free account
                        </p>

                        {/* <Button
                            disabled
                            size="sm"
                            variant="twitter"
                            className="mb-2 w-100"
                        >
                            <FontAwesomeIcon
                                className="mr-2"
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
                                className="mr-2"
                                icon={faFacebook}
                            />
                            Signup via facebook
                        </Button>

                        <div className="my-3">
                            <span style={{ fontSize: "0.8rem" }}>OR</span>
                        </div> */}

                        <Form ref={form} onSubmit={handleSubmit}>
                            {status && <CustomAlert status={status} />}

                            <div className="my-3 d-flex">
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
                                    value={info.username}
                                    placeholder="Username"
                                    className="ccard__input pl-2"
                                    onChange={(e) =>
                                        setInfo({
                                            ...info,
                                            username: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="my-3 d-flex">
                                <span className="ccard__input-prepend">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["far", "user"]}
                                    />
                                </span>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={info.first_name}
                                    placeholder="First name"
                                    className="ccard__input pl-2"
                                    onChange={(e) =>
                                        setInfo({
                                            ...info,
                                            first_name: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="my-3 d-flex">
                                <span className="ccard__input-prepend">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["far", "user"]}
                                    />
                                </span>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={info.last_name}
                                    placeholder="Last name"
                                    className="ccard__input pl-2"
                                    onChange={(e) =>
                                        setInfo({
                                            ...info,
                                            last_name: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="my-3 d-flex">
                                <span className="ccard__input-prepend">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "envelope"]}
                                    />
                                </span>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={info.email}
                                    placeholder="Email address"
                                    className="ccard__input pl-2"
                                    onChange={(e) =>
                                        setInfo({
                                            ...info,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="my-3 d-flex">
                                <span className="ccard__input-prepend">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "lock"]}
                                    />
                                </span>
                                <input
                                    required
                                    type="password"
                                    name="password1"
                                    placeholder="Create password"
                                    className="ccard__input pl-2"
                                />
                            </div>

                            <div className="my-3 d-flex">
                                <span className="ccard__input-prepend">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "lock"]}
                                    />
                                </span>

                                <input
                                    required
                                    type="password"
                                    name="password2"
                                    placeholder="Repeat password"
                                    className="ccard__input pl-2"
                                />
                            </div>

                            <div className="form-group mt-4">
                                <Button
                                    size="sm"
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
