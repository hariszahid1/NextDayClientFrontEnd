import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import UserList from "../../components/UserList/UserList";
// import ListUser from "./UserList.json";
import { toastmessage } from "../../components/ToastMessage/toast";
import "./MealForm.css";

function MealForm() {
  const [mealName, setMealName] = useState("");
  const [mealDesc, setMealDesc] = useState("");
  const [mealType, setMealType] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("testting");
    e.preventDefault();

    const addMeal = {
      mealName,
      mealDesc,
      mealType,
    };

    const header = { "Content-Type": "application/json" };
    console.log(addMeal);

    await axios
      .post(`http://localhost:8001/api/meals/addMeal`, addMeal, header)
      .then((res) => {
        toastmessage("New Meal is Created!", "success");
        navigate("/meal");
      })
      .catch((err) => {
        toastmessage(err.response.data.error, "error");
      });
  };

  const mealCategories = [
    { value: "Sauce1", label: "Sauce1" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <Row className="userBackground">
      <Row>
        <Col></Col>
        <Col className="mt-5">
          <h2 className="rounded text-center bg-success text-white w-100">
            Meal Form
          </h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicMealName">
              <Form.Label>MealName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Meal Name"
                value={mealName}
                onChange={(e) => {
                  setMealName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMealDesc">
              <Form.Label>Meal Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Meal Description"
                value={mealDesc}
                onChange={(e) => {
                  setMealDesc(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTypeName">
              <Form.Label>Meal Type</Form.Label>
              <Select
                options={mealCategories}
                onChange={(value) => {
                  setMealType(value.value);
                }}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col className="mt-4">
          {/* <UserList
            list={list}
            updateList={HandleUpdateList}
            deleteItem={HandleDeleteItem}
          /> */}
        </Col>
      </Row>
    </Row>
  );
}

export default MealForm;
