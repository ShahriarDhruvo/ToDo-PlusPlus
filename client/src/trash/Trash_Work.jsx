import React, { useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import CustomModal from "../../generic/Modal";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";

const Trash_Work = (props) => {
    const [status, setStatus] = useState(undefined);

    const markAsCompleted = (work) => {
        const completed = !work.completed;
        const API_URL = `/work/update/${work.id}`;

        const loadData = async () => {
            try {
                fetch(API_URL, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        completed: completed,
                        title: work.title,
                    }),
                });

                // Try to create a universal error to handle all this kind of shits
                // const data = await response.json();
                setStatus(undefined); // for warning -_-
                // if (!response.ok) setError(data.title);
                props.updateFlag();
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    };

    const deleteItem = (id) => {
        const API_URL = `/work/delete/${id}`;

        const loadData = async () => {
            fetch(API_URL, {
                method: "DELETE",
            });

            props.updateFlag();
        };

        loadData();
    };

    const breakpointColsObj = {
        default: 4,
        1200: 3,
        992: 3,
        768: 2,
        576: 1,
    };

    return (
        <Masonry
            breakpointCols={breakpointColsObj}
            className="d-flex text-center"
            columnClassName="mx-2"
        >
            {props.works.map((work, index) => (
                <div
                    key={index}
                    className={`ccard card__hover my-3 ${
                        work.completed ? "bg-complete-bg" : "bg-main-bg"
                    }`}
                >
                    <div className="px-3 pt-3">
                        {!work.completed ? (
                            <span>{work.title}</span>
                        ) : (
                            <strike>{work.title}</strike>
                        )}
                    </div>

                    <div className="pt-1">
                        {/* <Link
                            // size="sm"
                            // as={Link}
                            // variant="outline-main"
                            // className="border"
                            // style={{ maxWidth: "1rem" }}
                            to={`/${work.id}/task/list/`}
                        >
                            <img
                                src="/img/icons/more.png"
                                alt="more"
                                style={{ width: "2rem" }}
                            />
                        </Link> */}

                        <Button variant="" className="dropdown">
                            <FontAwesomeIcon
                                className="mb-1"
                                icon={["fas", "caret-down"]}
                            />
                            <ul className="dropdown_menu p-0 m-0">
                                <li className="py-2 dropdown_item-1">Item 1</li>
                                <li className="py-2 dropdown_item-2">Item 2</li>
                                <li className="py-2 dropdown_item-3">Item 3</li>
                                <li className="py-2 dropdown_item-4">Item 4</li>
                                <li className="py-2 dropdown_item-5">Item 5</li>
                            </ul>
                        </Button>
                    </div>
                </div>
            ))}
        </Masonry>
    );
};

export default Trash_Work;
