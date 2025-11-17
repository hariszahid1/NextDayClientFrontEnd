import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { BASEURL } from '../../../../utils/Apis';
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { toastmessage } from "../../../../components/ToastMessage/toast";
import MealModalType1 from "../../../../components/MealTypeModal/MealModalType1";
import {
  getAllMealMeasurement,
  getAllMealCategory,
} from "../../../../utils/Apis";
import "./MealForm.css";
import Table from "react-bootstrap/Table";
const MealList = [
  {
    id: 1,
    mealName: "otto",
  },
  {
    id: 2,
    mealName: "kfc",
  },
];
function MealForm(props) {
  const { addMeal, meal, editMeal } = props;
  const [Catorylist, setCategoryList] = useState([]);
  const [Measurementlist, setMeasurementList] = useState([]);
  const [mealCategory, setMealCategory] = useState("");
  const [mealName, setMealName] = useState("");
  const [mealDesciption, setMealDescription] = useState("");
  const [measurementUnit, setMeasurementUnit] = useState("");
  const [minServing, setMinServing] = useState("");
  const [increment, setIncrement] = useState("");
  const [maxserving, setMaxServing] = useState("");
  const [minservingCarbs, setMinServingCarbs] = useState("");
  const [minservingfat, setMinServingFat] = useState("");
  const [minservingprotein, setMinServingProtein] = useState("");
  const [carbs, setCarbs] = useState([]);
  const [id, setId] = useState("");
  const [carbsChecked, setCarbsChecked] = useState(false);
  const [addCarbMeal, setAddCarbMeal] = useState(false);
  const [addedMeal, setAddedMeal] = useState([]);

  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setCarbs(...addedMeal)
    if (addMeal) {
      const addMeal = {
        mealCategory,
        mealName,
        mealDesciption,
        measurementUnit,
        minServing,
        increment,
        maxserving,
        minservingCarbs,
        minservingfat,
        minservingprotein,
        carbs,
      };
      const header = { "Content-Type": "application/json" };
      await axios
        .post(`${BASEURL}/meals/addMeal`, addMeal, header)
        .then((res) => {
          toastmessage("New Meal is Created!", "success");

          navigate("/meal");
        })
        .catch((err) => {
          toastmessage(err.response.data.error, "error");
        });
    } else {
      const addMeal = {
        mealCategory,
        mealName,
        mealDesciption,
        measurementUnit,
        minServing,
        increment,
        maxserving,
        minservingCarbs,
        minservingfat,
        minservingprotein,
        carbs,
      };
      console.log(addMeal, "addMeal");
      const header = { "Content-Type": "application/json" };
      await axios
        .patch(
          `${BASEURL}/meals/editMeal/${id}`,
          addMeal,
          header
        )
        .then((res) => {
          toastmessage("Meal Record Updated Successfully!", "success");

          navigate("/meal");
        })
        .catch((err) => {
          toastmessage(err.response.data.error, "error");
        });
    }
  };
  const HandleCarbMeal = (data) => {
    setAddedMeal(data);
    setCarbs(data)
    setAddCarbMeal(false)
  };
  console.log(carbs, "carbs")

  const GetAllMealCategory = async () => {
    await axios.get(getAllMealCategory).then((res) => {
      const categorylist = res.data.map((data) => {
        return { ...data, value: data.categoryName, label: data.categoryName };
      });
      setCategoryList(categorylist);
    });
  };
  const GetAllMealMeasurement = async () => {
    await axios.get(getAllMealMeasurement).then((res) => {
      const measurementlist = res.data.map((data) => {
        return {
          ...data,
          value: data.mealmeasurement,
          label: data.mealmeasurement,
        };
      });
      setMeasurementList(measurementlist);
    });
  };
  useEffect(() => {
    if (editMeal) {
      setMealCategory(meal.mealCategory);
      setMealName(meal.mealName);
      setMealDescription(meal.mealDesciption);
      setMeasurementUnit(meal.measurementUnit);
      setMinServing(meal.minServing);
      setIncrement(meal.increment);
      setMaxServing(meal.maxserving);
      setMinServingCarbs(meal.minservingCarbs);
      setMinServingFat(meal.minservingfat);
      setMinServingProtein(meal.minservingprotein);
      setId(meal._id);
    }
    GetAllMealCategory();
    GetAllMealMeasurement();
  }, [props.meal]);
  // Table work
  const HandleAddMeal = () => {
    setAddCarbMeal(true);
  };
  const HandleDeleteMeal = (id) => {
    console.log(id)
    setAddedMeal(addedMeal.filter((item) => item.id !== id));
    setCarbs(carbs.filter((item) => item.id !== id))
  }
  console.log(carbs)
  return (
    <Row className="max-width explore-section">
      <Col>
        <Row className="well m-4">
          <h2 className="rounded w-100 ml-3">
            {addMeal ? "Add Meal Form" : "Edit Meal Form"}
          </h2>

          <Col>
            <Form className="p-3 " onSubmit={HandleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridMealCategory">
                  <Form.Label>Meal Category</Form.Label>
                  <Select
                    options={Catorylist}
                    onChange={(value) => {
                      setMealCategory(value.value);
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridMealName">
                  <Form.Label>Meal Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Meal Name"
                    value={mealName}
                    onChange={(e) => {
                      setMealName(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridMealDescription">
                <Form.Label>Meal Description</Form.Label>
                <Form.Control
                  placeholder="Enter Meal Description"
                  value={mealDesciption}
                  onChange={(e) => {
                    setMealDescription(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridMealMeasurement">
                <Form.Label>Enter Meal Measurement Units</Form.Label>
                <Select
                  options={Measurementlist}
                  onChange={(value) => {
                    setMeasurementUnit(value.value);
                  }}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Min Serving(e.g:2)</Form.Label>
                  <Form.Control
                    type="text"
                    value={minServing}
                    onChange={(e) => {
                      setMinServing(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Increment</Form.Label>
                  <Form.Control
                    value={increment}
                    onChange={(e) => {
                      setIncrement(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Max Serving(e.g:2)</Form.Label>
                  <Form.Control
                    type="text"
                    value={maxserving}
                    onChange={(e) => {
                      setMaxServing(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Min Serving carbs</Form.Label>
                  <Form.Control
                    value={minservingCarbs}
                    onChange={(e) => {
                      setMinServingCarbs(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Min Serving fat(e.g:2)</Form.Label>
                  <Form.Control
                    type="text"
                    value={minservingfat}
                    onChange={(e) => {
                      setMinServingFat(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Min Serving protein</Form.Label>
                  <Form.Control
                    value={minservingprotein}
                    onChange={(e) => {
                      setMinServingProtein(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Add Carbs"
                  value={carbsChecked}
                  checked={carbsChecked}
                  onChange={(e) => setCarbsChecked(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          {carbsChecked ? (
            <Row className="">
              <Col md="10"></Col>
              <Col md="2">
                <Button
                  className="float-right w-100 btn btn-secondary"
                  onClick={HandleAddMeal}
                >
                  Add Meal
                </Button>
              </Col>

              <Col>
                <Table striped bordered hover className="bg-success">
                  <thead>
                    <tr>
                      <th>Meal Name</th>
                      <th>Delete Meal</th>
                    </tr>
                  </thead>
                  {addedMeal.map((meal) => {
                    return (
                      <tbody>
                        <tr>
                          <td>{meal.mealName}</td>
                          <td>
                            <Button className="float-right w-100 btn btn-danger" onClick={() => { HandleDeleteMeal(meal.id) }}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
              </Col>
            </Row>
          ) : (
            ""
          )}
        </Row>
        <MealModalType1
          carbs={addCarbMeal}
          setNewCarbMeal={HandleCarbMeal}
          closeModal={() => {
            setAddCarbMeal(false)
          }}
          addedMeal={addedMeal}
          setAddedMeal={setAddedMeal}
        />
      </Col>
      {/* Table */}
    </Row>
  );
}

export default MealForm;
