import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Meal.css";
import ReUseAbleTable from "../../components/Table/Table";
import { TableData } from "./TableData";
import AlertModal from "../../components/AlertModal/AlertModal";
import { toastmessage } from "../../components/ToastMessage/toast";

function Meal() {
  const [list, setList] = useState([]);
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");

  const Navigate = useNavigate();

  const addMeal = () => {
    Navigate("/meal/addMeal");
  };

  const ManageCategory = () => {
    Navigate(`/mealCategory/list`);
  };
  const ManageMeasurement = () => {
    Navigate(`/mealMeasurement/list`);
  };
  const HandleDelete = (id) => {
    setId(id);
    setPopup(true);
  };
  const HandleView = (id) => {
    Navigate(`/meal/detailmeal/${id}`);

  };
  const HandleUpdate = (id) => {
    Navigate(`/meal/editmeal/${id}`);
  };
  const HandleAddIngredient = (id) => {
    Navigate(`/Meal/Ingredients/${id}`);

  }
  const HandleClosePopup = async (value) => {
    if (value === "delete") {
      await axios
        .delete(`http://localhost:8001/api/meals/deleteMeal/${id}`)
        .then((res) => {
          toastmessage(res.data, "success");
          setPopup(false);
          GetAllMeals();
        });
    }
    if (value === "close") {
      setPopup(false);
    }
  };
  const HandleDeletePopup = () => { };
  const GetAllMeals = async () => {
    await axios
      .get(`http://localhost:8001/api/meals/getMeal/All`)
      .then((res) => {
        setList(res.data);
      });
  };

  useEffect(() => {
    GetAllMeals();
  }, []);

  return (
    <Row
      className={`max-width explore-section ${list.length < 4 ? "explore-background" : ""
        }`}
    >
      <Col>
        <Row className="text-center mt-2 align-items-center">
          <Col md={2}>
            &nbsp;
            <Button
              className="btn btn-info text-white "
              onClick={ManageCategory}
            >
              {" "}
              Meal Category
            </Button>
            <Button
              className="btn btn-info text-white mt-2"
              onClick={ManageMeasurement}
            >
              {" "}
              Meal Measure
            </Button>
          </Col>
          <Col md={8}>
            <h1 className="text-center text-danger font-weight-bold meal-heading">
              Meal List
            </h1>
          </Col>
          <Col md={2}>
            <Button className="btn btn-info ml-2 text-white" onClick={addMeal}>
              + Add New Meal
            </Button>
          </Col>
        </Row>

        <div className="explore-grid mt-5">
          {/* {list.map((meal, i) => ( */}
          <ReUseAbleTable
            TableData={TableData}
            TableMaplist={[
              "id",
              "firstname",
              "lastname",
              "address",
              "email",
              "contact",
            ]}
            GetTableList={list}
            DeleteData={HandleDelete}
            ViewData={HandleView}
            EditData={HandleUpdate}
            AddIngredients={HandleAddIngredient}
          />
        </div>
      </Col>
      <AlertModal popup={popup} setPopup={HandleClosePopup} />
    </Row>
  );
}

export default Meal;
