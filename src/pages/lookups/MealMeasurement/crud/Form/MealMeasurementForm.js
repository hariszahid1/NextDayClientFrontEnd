import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toastmessage } from "../../../../../components/ToastMessage/toast";
import MealModalType1 from "../../../../../components/MealTypeModal/MealModalType1";
import "./MealMeasurementForm.css";
import { AddMealMeasurement, UpdateMealMeasurement } from "../../../../../utils/Apis";
function MealMeasurementForm(props) {
  const { addMealMeasurementUnit, meal, editMealMeasurement } = props;
  console.log("props");
  const [mealmeasurement, setmealmeasurement] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (addMealMeasurementUnit) {
      const addMealMeasurement = {
        mealmeasurement,
      };
      const header = { "Content-Type": "application/json" };
      await axios
        .post(AddMealMeasurement, addMealMeasurement, header)
        .then((res) => {
          toastmessage("New  Meal Measurement Unit is Created!", "success");

          navigate("/mealMeasurement/list");
        })
        .catch((err) => {
          toastmessage(err.response.data.error, "error");
        });
    } else {
      const addMealMeasurement = {
        mealmeasurement,
      };
      const header = { "Content-Type": "application/json" };
      await axios
        .patch(
          `${UpdateMealMeasurement}/${id}`,
          addMealMeasurement,
          header
        )
        .then((res) => {
          toastmessage("Meal Record Updated Successfully!", "success");

          navigate("/mealMeasurement/list");
        })
        .catch((err) => {
          toastmessage(err.response.data.error, "error");
        });
    }
  };
  useEffect(() => {
    console.log(meal, "meal");
    if (editMealMeasurement) {
      setmealmeasurement(meal.mealmeasurement);
      setId(meal._id);
    }
  }, [props.meal]);

  return (
    <Row className="max-width explore-section">
      <Col>
        <Row className="well m-4">
          <h2 className="rounded w-100 ml-3">
            {addMealMeasurementUnit
              ? "Add  Meal Measurement Unit Form"
              : "Edit  Meal Measurement Unit Form"}
          </h2>

          <Col>
            <Form className="p-3 " onSubmit={HandleSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Group as={Col} controlId="formGridMealCategory">
                    <Form.Label>Meal  Measurement Unit</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter  Meal Measurement Unit"
                      value={mealmeasurement}
                      onChange={(e) => {
                        setmealmeasurement(e.target.value);
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

export default MealMeasurementForm;
