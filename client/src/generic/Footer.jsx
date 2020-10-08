import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    return (
        <footer
            id="footer"
            className="shadow text-center bg-bg py-4"
            style={{ borderRadius: "0.5rem" }}
        >
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
