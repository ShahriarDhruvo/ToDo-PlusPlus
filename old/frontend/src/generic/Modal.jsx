import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const CustomModal = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAction = () => {
        handleClose();
        props.handleAction();
    };

    return (
        <>
            <Button
                variant={props.variant}
                className={props.actionButtonClass}
                size={props.actionButtonSize}
                onClick={handleShow}
                disabled={props.edit}
            >
                {props.children}
            </Button>

            <Modal show={show} onHide={handleClose} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.modalBody}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant={props.actionVariant}
                        onClick={handleAction}
                    >
                        {props.modalTitle}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CustomModal;
