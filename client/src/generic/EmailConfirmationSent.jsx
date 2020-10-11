import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CustomAlert from "./CustomAlert";

const EmailConfirmationSent = () => {
    const params = useParams();

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <div
                className="ccard bg-main-bg p-4 text-center"
                style={{ maxWidth: "40rem" }}
            >
                <h4>Verify Your E-mail Address</h4>

                <p className="my-3">
                    We have sent an e-mail to you for verification. Follow the
                    link provided to finalize the signup process. Please contact
                    us if you do not receive it within a few minutes.
                </p>

                <CustomAlert
                    status={`Confirmation e-mail sent to ${params.email}.`}
                    variant="success"
                />
            </div>
        </Container>
    );
};

export default EmailConfirmationSent;
