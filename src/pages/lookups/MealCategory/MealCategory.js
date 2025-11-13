import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MealCategory.css";
import ReUseAbleTable from "../../../components/CategoryTable/Table";
import { TableData } from "./TableData";
import AlertModal from "../../../components/AlertModal/AlertModal";
import { toastmessage } from "../../../components/ToastMessage/toast";
import { getAllMealCategory, deleteMealCategory } from "../../../utils/Apis";
function MealCategory() {
  const [list, setList] = useState([]);
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");

  const Navigate = useNavigate();

  const addMeal = () => {
    Navigate("/mealCategory/addMealCategory");
  };

  const ManageCategory = () => {
    Navigate(`/MealCategory/Ingredients/${id}`);
  };
  const HandleDelete = (id) => {
    setId(id);
    setPopup(true);
  };
  const HandleView = (id) => {
    Navigate(`/meal/detailmeal/${id}`);

  };
  const HandleUpdate = (id) => {
    Navigate(`/mealCategory/editMealCategory/${id}`);
  };

  const HandleClosePopup = async (value) => {
    if (value === "delete") {
      await axios
        .delete(`${deleteMealCategory}/${id}`)
        .then((res) => {
          toastmessage(res.data, "success");
          setPopup(false);
          GetAllMealCategory();
        });
    }
    if (value === "close") {
      setPopup(false);
    }
  };
  const GetAllMealCategory = async () => {
    await axios
      .get(getAllMealCategory)
      .then((res) => {
        setList(res.data);
      });
  };

  useEffect(() => {
    GetAllMealCategory();
  }, []);
  const HandleChangeValue = (ItemId, btnName) => {
    if (btnName === "Edit") {
      HandleUpdate(ItemId);
    }
    if (btnName === "Delete") {
      HandleDelete(ItemId);
    }
    if (btnName === "View") {
      HandleView(ItemId);
    }
  };

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
            // onClick={ManageCategory}
            >
              {" "}
              Meal Category Type
            </Button>
          </Col>
          <Col md={8}>
            <h1 className="text-center text-danger font-weight-bold meal-heading">
              Meal Category List
            </h1>
          </Col>
          <Col md={2}>
            <Button className="btn btn-info ml-2 text-white" onClick={addMeal}>
              + Add New Meal Category
            </Button>
          </Col>
        </Row>

        <div className="explore-grid mt-5">
          {/* {list.map((meal, i) => ( */}
          <ReUseAbleTable
            TableData={TableData}
            TableMaplist={[
              "categoryName"
            ]}
            GetTableList={list}
            onChangeValue={HandleChangeValue}

          />
        </div>
      </Col>
      <AlertModal popup={popup} setPopup={HandleClosePopup} />
    </Row>
  );
}

export default MealCategory;
