import React, { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import ThemeSwitcher from "../../theme/ThemeSwitcher";

const Profile = () => {
    const [user, setUser] = useState({});
    const [status, setStatus] = useState(undefined);
    const params = useParams();

    useEffect(() => {
        const API_URL =
            Object.keys(params).length !== 0
                ? `/accounts/collaborator/profile/${params.wid}/${params.uid}`
                : "/accounts/user/";

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "GET",
                // headers: {
                //     Accept: "application/json",
                //     Authorization: token,
                //     "Content-Type": "application/json",
                // },
            });

            const data = await response.json();

            if (!response.ok) setStatus(data.detail);
            else setUser(Object.keys(params).length !== 0 ? data[0] : data);
        };

        // if (token) loadData();
        loadData();
    }, [params]);

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

                        {user.first_name || user.last_name ? (
                            <>
                                <b>Full Name: </b>
                                {user.first_name + " " + user.last_name}
                                <br />
                            </>
                        ) : null}

                        <b>Email: </b>
                        {user.email}
                    </div>
                    {Object.keys(params).length === 0 ? (
                        <Link to="/password/change/">Change Password</Link>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </Container>
    );
};

export default Profile;
