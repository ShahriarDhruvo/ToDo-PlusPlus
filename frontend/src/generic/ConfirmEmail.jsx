import React, { useEffect } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const ConfirmEmail = () => {
    // const [message, setMessage] = useState("dd");
    const params = useParams();

    // useEffect(() => {
    //     const API_URL = "/accounts/confirm-email/";

    //     const loadData = async () => {
    //         const response = await fetch(API_URL, {
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             },
    //         });

    //         const data = await response.text();

    //         console.log(data);
    //     };

    //     loadData();
    // }, []);

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <div
                className="ccard p-4 text-center"
                style={{ maxWidth: "40rem" }}
            >
                <h4>Verify Your E-mail Address</h4>

                <p className="my-3">
                    We have sent an e-mail to you for verification. Follow the
                    link provided to finalize the signup process. Please contact
                    us if you do not receive it within a few minutes.
                </p>

                <Alert variant="success">
                    Confirmation e-mail sent to {params.email}.
                </Alert>

                {/* <div className="my-3 divider-text">
                    <span className="px-4 bg-main-bg">OR</span>
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <Button
                        size="sm"
                        as={Link}
                        variant="outline-primary"
                        to="/api/v1/accounts/email/"
                    >
                        Change E-mail
                    </Button>
                </div> */}
            </div>
        </Container>
    );
};

export default ConfirmEmail;
