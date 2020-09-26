import React, { useState, useRef } from "react";
import { Button, Form, InputGroup, Alert } from "react-bootstrap";

const CreateWork = (props) => {
    const [error, setError] = useState(undefined);
    const form = useRef(null);

    const token = "6a3fd094a2902e2b0c7180569fae8dd4e0828ea9";

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
                    headers: {
                        Authorization: "TOKEN " + token,
                    },
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
        <div className="ccard card-body mb-2 bg-main-bg">
            <Form ref={form} onSubmit={handleSubmit}>
                <div className="text-center">
                    {error && <Alert variant="danger">{error}</Alert>}
                </div>

                <InputGroup>
                    <Form.Control
                        type="text"
                        name="title"
                        defaultValue=""
                        className="rounded mr-2"
                        placeholder="Add work..."
                    />

                    <Button variant="main" type="submit">
                        Add Work
                    </Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default CreateWork;
