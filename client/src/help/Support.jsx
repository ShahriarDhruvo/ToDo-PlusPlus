import React from "react";
import emoji from "react-easy-emoji";
import { Container } from "react-bootstrap";

const Support = () => {
    return (
        <Container className="vertical-center">
            <div className="col ccard bg-main-bg" style={{ maxWidth: "28rem" }}>
                <div className="p-3 p-md-4 text-center">
                    <img
                        src="/static/img/bkash.png"
                        alt="bkash"
                        style={{ width: "8rem" }}
                    />
                    <h5>My Bkash number</h5>
                    <h4 className="my-3">+8801977298142</h4>
                    <span>Thanks for the support guys! {emoji("😁")}</span>
                </div>
            </div>
        </Container>
    );
};

export default Support;
