import React, { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ThemeSwitcher from "../../theme/ThemeSwitcher";

const Profile = () => {
    const [user, setUser] = useState({});
    const [status, setStatus] = useState(undefined);
    const params = useParams();

    const token = "6a3fd094a2902e2b0c7180569fae8dd4e0828ea9";

    useEffect(() => {
        const API_URL = `/users/profile/${params.wid}/${params.uid}`;

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: "TOKEN " + token,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) setStatus(data.detail);
            else setUser(data[0]);
        };

        loadData();
    }, [params]);

    return (
        <Container className="vertical-center">
            {status ? (
                <div className="ccard card-body bg-main-bg">
                    <Alert variant="danger" className="m-0">
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

                        <b>Name: </b>
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
