import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import ThemeSwitcher from "../../theme/ThemeSwitcher";
import CustomAlert from "../../generic/CustomAlert";
import { useContext } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";

const Profile = () => {
    const [user, setUser] = useState({});
    const [status, setStatus] = useState(undefined);
    const params = useParams();

    const { handleLogOut } = useContext(AuthenticationContext);

    useEffect(() => {
        const API_URL =
            Object.keys(params).length !== 0
                ? `/api/v1/accounts/collaborator/profile/${params.wid}/${params.uid}`
                : "/api/v1/accounts/user/";

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "GET",
            });

            if (response.status === 401) handleLogOut();

            const data = await response.json();

            if (!response.ok) setStatus(data.detail);
            else setUser(Object.keys(params).length !== 0 ? data[0] : data);
        };

        loadData();
    }, [params, handleLogOut]);

    return (
        <Container className="vertical-center">
            {status ? (
                <CustomAlert status={status} />
            ) : (
                <div
                    className="ccard p-3 p-sm-4 text-center w-100 bg-main-bg"
                    style={{ maxWidth: "28rem" }}
                >
                    <img
                        src="/static/img/profile_pic.png"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/img/Default.png";
                        }}
                        alt="profile"
                        style={{ maxWidth: "10rem" }}
                    />

                    <ThemeSwitcher />

                    <div className="mb-3">
                        <b>Username: </b>
                        {user.username}
                        <br />

                        {user.first_name ||
                            (user.last_name && (
                                <>
                                    <b>Full Name: </b>
                                    {user.first_name + " " + user.last_name}
                                    <br />
                                </>
                            ))}

                        <b>Email: </b>
                        {user.email}
                    </div>

                    {Object.keys(params).length === 0 && (
                        <Link to="/password/change/">Change Password</Link>
                    )}
                </div>
            )}
        </Container>
    );
};

export default Profile;
