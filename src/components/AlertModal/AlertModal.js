import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ImCross } from "react-icons/im";

function AlertModal({ popup, setPopup }) {
  const handleSave = () => {
    setPopup("delete");
  };

  const handleClose = () => {
    setPopup("close");
  };

  return (
    <>
      <Modal show={popup} onHide={handleClose}>
        <Modal.Body className="p-4">
          <Row className="p-2">
            <ImCross size={30} color={"red"} />

            <p className="text-center mt-4">Are you Sure You Want to Delete</p>
            <p className="text-center mt-2">Record</p>

          </Row>
        </Modal.Body>
        <Row className="p-3 text-center">
          <Col>
            <Button className="w-100" variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Col>
          <Col>
            <Button className="w-100" variant="danger" onClick={handleSave}>
              Delete
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default AlertModal;
