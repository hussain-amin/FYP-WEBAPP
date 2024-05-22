import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RemoveStudent = ({ show, onHide, onConfirm, message }) => {
    return (
        <Modal centered show={show} onHide={onHide} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>Remove Student?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div dangerouslySetInnerHTML={{ __html: message }} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemoveStudent;