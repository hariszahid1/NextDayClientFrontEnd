import React, { useEffect, useState } from "react";
import Card from "../../components/MealCards/Card";
import { mealTypes } from "./mealtype1";
import "./Meal.css";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import MealForm from "./MealForm";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

const Meal = () => {
  const [list, setList] = useState([]);
  const Navigate = useNavigate();

  const addMeal = () => {
    Navigate("/MealForm");
  };

  const ManageCategory = () => {
    Navigate("/MealCategory");
  };
 const HandleUpdateList = () => {
    GetMeals();
  };
  const GetMeals = async () => {
    await axios.get(`http://localhost:8001/api/meals/getmeals`).then((res) => {
      setList(res.data);
      //console.log(res.data);
    });
  };

  useEffect(() => {
    GetMeals();
  }, []);

  return (
    <Row className={`max-width explore-section ${list.length<4?"explore-background":""}`}>
      <Col>
        <Row className="text-center mt-2 align-items-center">
          <Col md={2}>
            &nbsp;
            <Button
              className="btn btn-info text-white "
              onClick={ManageCategory}
            >
              {" "}
              Meal Type
            </Button>
          </Col>
          <Col md={8}>
            <h1 className="text-center text-danger font-weight-bold meal-heading">
              Meal Prep Page
            </h1>
          </Col>
          <Col md={2}>
            <Button className="btn btn-info ml-2 text-white" onClick={addMeal}>
              Add New Meal
            </Button>
          </Col>
        </Row>

        <div className="explore-grid">
          {list.map((meal, i) => (
            <Card meal={meal} i={i} UpdateList={HandleUpdateList} />
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default Meal;
