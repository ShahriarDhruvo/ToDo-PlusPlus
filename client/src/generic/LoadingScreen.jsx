import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingScreen = () => {
    return (
        <>
            <Spinner animation="border" variant="syntax" />
            <p className="ml-3 mt-3">Loading...</p>
        </>
    );
};

export default LoadingScreen;
