import React, { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ThemeSwitcher from "../../theme/ThemeSwitcher";
import { useContext } from "react";
import { TokenContext } from "../../contexts/TokenContext";

const Profile = () => {
    const [user, setUser] = useState({});
    const [status, setStatus] = useState(undefined);
    const { token } = useContext(TokenContext);
    const params = useParams();

    useEffect(() => {
        const API_URL =
            Object.keys(params).length !== 0
                ? `/users/profile/${params.wid}/${params.uid}`
                : "/user/user/";

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) setStatus(data.detail);
            else setUser(Object.keys(params).length !== 0 ? data[0] : data);
        };

        if (token) loadData();
    }, [params, token]);

    return (
        <Container className="vertical-center">
            {status ? (
                <div className="ccard card-body bg-main-bg">
                    <Alert variant="danger" className="text-center m-0">
                        {status}
                    </Alert>
                </div>
            ) : (
                <div
                    className="ccard card-body text-center w-100 bg-main-bg"
                    style={{ maxWidth: "30rem", minWidth: "20rem" }}
                >
                    <img
                        src="/img/profile_pic.png"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/img/Default.png";
                        }}
                        alt="profile"
                        className=""
                        style={{ maxWidth: "11rem" }}
                    />

                    <ThemeSwitcher />

                    <div className="mb-3">
                        <b>Username: </b>
                        {user.username}
                        <br />

                        <b>Full Name: </b>
                        {user.first_name + " " + user.last_name}
                        <br />

                        <b>Email: </b>
                        {user.email}
                    </div>
                </div>
            )}
        </Container>
    );
};

export default Profile;
