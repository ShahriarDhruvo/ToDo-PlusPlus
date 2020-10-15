import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import CustomAlert from "../../generic/CustomAlert";

const CreateWork = (props) => {
    const [error, setError] = useState(undefined);
    const form = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (e.target.title.value === "")
            return setError("You can't add an empty work title !!!");

        for (let i = 0; i < props.works.length; i++) {
            if (props.works[i].title === e.target.title.value) {
                return setError(
                    "You have already added a similar work title..."
                );
            }
        }

        const API_URL = "work/create/";

        const loadData = async () => {
            const formData = new FormData(form.current);

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok) setError(data.title);
            } catch (error) {
                setError(error);
            }
        };

        loadData();
        e.target.title.value = null;
        props.updateFlag();
    };

    return (
        <div className="mb-4 mb-sm-5">
            <Form ref={form} onSubmit={handleSubmit}>
                {error && <CustomAlert status={error} />}

                <div className="d-flex">
                    <input
                        required
                        type="text"
                        name="title"
                        placeholder="Add work..."
                        onChange={() => setError("")}
                        className="ccard__input mr-3 pl-2"
                    />

                    <Button size="sm" variant="main" type="submit">
                        Add Work
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CreateWork;
