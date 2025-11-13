import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toastmessage } from "../../../../../components/ToastMessage/toast";
import MealModalType1 from "../../../../../components/MealTypeModal/MealModalType1";
import "./MealCategoryForm.css";
import { AddMealCategroy, UpdateMealCategory } from "../../../../../utils/Apis";
function MealCategoryForm(props) {
  const { addMealCategory, meal, editMealCategory } = props;
  console.log("props");
  const [categoryName, setMealCategory] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (addMealCategory) {
      const addMealCategory = {
        categoryName,
      };
      const header = { "Content-Type": "application/json" };
      await axios
        .post(AddMealCategroy, addMealCategory, header)
        .then((res) => {
          toastmessage("New Meal Category is Created!", "success");

          navigate("/mealCategory/list");
        })
        .catch((err) => {
          toastmessage(err.response.data.error, "error");
        });
    } else {
      const addMealCategory = {
        categoryName,
      };
      const header = { "Content-Type": "application/json" };
      await axios
        .patch(
          `${UpdateMealCategory}/${id}`,
          addMealCategory,
          header
        )
        .then((res) => {
          toastmessage("Meal Record Updated Successfully!", "success");

          navigate("/mealCategory/list");
        })
        .catch((err) => {
          toastmessage(err.response.data.error, "error");
        });
    }
  };
  useEffect(() => {
    console.log(meal, "meal");
    if (editMealCategory) {
      setMealCategory(meal.categoryName);
      setId(meal._id);
    }
  }, [props.meal]);

  return (
    <Row className="max-width explore-section">
      <Col>
        <Row className="well m-4">
          <h2 className="rounded w-100 ml-3">
            {addMealCategory
              ? "Add Meal Category Form"
              : "Edit Meal Category Form"}
          </h2>

          <Col>
            <Form className="p-3 " onSubmit={HandleSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Group as={Col} controlId="formGridMealCategory">
                    <Form.Label>Meal Category</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Meal Category"
                      value={categoryName}
                      onChange={(e) => {
                        setMealCategory(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default MealCategoryForm;
