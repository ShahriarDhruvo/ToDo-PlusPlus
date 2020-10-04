import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    return (
        <footer
            id="footer"
            className="text-center bg-main-bg py-4 shadow"
            style={{ borderRadius: "0.25rem" }}
        >
            <p>Developed by, Shahriar Elahi Dhruvo</p>
            <small>Follow me on</small>

            <ul className="list-inline social">
                <li className="list-inline-item clink">
                    <a href="/" className="text-syntax" target="_blank">
                        <FontAwesomeIcon icon={["fas", "globe"]} />
                    </a>
                </li>
                <li className="list-inline-item clink">
                    <a href="/" className="text-syntax" target="_blank">
                        <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                    </a>
                </li>
                <li className="list-inline-item clink">
                    <a href="/" className="text-syntax" target="_blank">
                        <FontAwesomeIcon icon={["fab", "twitter"]} />
                    </a>
                </li>
                <li className="list-inline-item clink">
                    <a href="/" className="text-syntax" target="_blank">
                        <FontAwesomeIcon icon={["fab", "linkedin"]} />
                    </a>
                </li>
                <li className="list-inline-item clink">
                    <a href="/" className="text-syntax" target="_blank">
                        <FontAwesomeIcon icon={["fab", "github"]} />
                    </a>
                </li>
            </ul>

            <small>A free and open-source project</small>
        </footer>
    );
};

export default Footer;
