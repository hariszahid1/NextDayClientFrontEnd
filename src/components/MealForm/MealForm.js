import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toastmessage } from "../../components/ToastMessage/toast";
import "./MealForm.css";

function MealForm() {
  const [list, setList] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [updateButton, setUpdateButton] = useState(false);
  const [updateId, setUpdateId] = useState("");


  const HandleSubmit = (e) => {
    e.preventDefault();
    const id = list.length + 1;
    const addUser = {
      id,
      username,
      password,
    };
    const newlist = [...list];
    newlist.push(addUser);
    setList(newlist);
    toastmessage("New Meal Created Successfully", "success");

    console.log(list);
  };
  const HandleUpdateList = (id) => {
    const UpdatedArrayItem = list.filter((item) => item.id === id);
    setUsername(UpdatedArrayItem[0].username);
    setPassword(UpdatedArrayItem[0].password);
    setUpdateId(UpdatedArrayItem[0].id)
    setUpdateButton(true);
  };
  const HandleUpdateSumbit = (e) => {
    e.preventDefault();
    const UpdatedArrayItem = list.map((item) => {
      if (item.id === updateId) {
        return { ...item, username: username, password: password };
      }
      return item;
    });
    setList(UpdatedArrayItem)
    setUpdateButton(false);
    setUsername("");
    setPassword("");
  };

  const HandleDeleteItem = (id) => {
    const filterArrayItem = list.filter((item) => item.id !== id);
    setList(filterArrayItem);
    toastmessage("Meal has been Deleted", "success");
  };
  return (
    <Row className="userBackground">
      <Row>
        <Col></Col>
        <Col className="mt-5">
          <h2 className="rounded text-center bg-success text-white w-100">
            MealForm Form
          </h2>
          <Form onSubmit={updateButton ?HandleUpdateSumbit : HandleSubmit  }>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            {updateButton ? (
              <Button variant="primary" type="submit" className="w-100">
                Update
              </Button>
            ) : (
              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            )}
          </Form>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col className="mt-4">
          
        </Col>
      </Row>
    </Row>
  );
}

export default MealForm;
