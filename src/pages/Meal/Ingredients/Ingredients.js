import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IngredientsList from "../../../components/IngredientsList/IngredientsList";
import ListIngredient from "./IngredientsList.json";
import { toastmessage } from "../../../components/ToastMessage/toast";
import "./Ingredients.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function Ingredients() {
  const [list, setList] = useState(ListIngredient);
  const [ingredientName, setIngredient] = useState("");
  const [ingredientWeight, setWeight] = useState("");
  const [ingredientCategory, setCategory] = useState("");
  const [updateButton, setUpdateButton] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const params = useParams();
  console.log(params);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const ingredients = {
      ingredients: [
        {
          ingredientName,
          ingredientWeight,
          ingredientCategory,
        },
      ],
    };
    // const id = list.length + 1;
    // const addIngredients = {
    //   id,
    //   ingredientName,
    //   ingredientWeight,
    //   ingredientCategory
    // };
    const header = { "Content-Type": "application/json" };
    await axios
      .put(
        `http://localhost:8001/api/meals/ingredients/addingredient/${params.id}`,
        ingredients,
        header
      )
      .then((res) => {
        toastmessage("New Meal is Created!", "success");
        // navigate("/meal");
      })
      .catch((err) => {
        toastmessage(err.response.data.error, "error");
      });
    // const newlist = [...list];
    // newlist.push(addIngredients);
    // setList(newlist);
  };
  const HandleUpdateList = (id) => {
    const UpdatedArrayItem = list.filter((item) => item.id === id);
    setIngredient(UpdatedArrayItem[0].ingredientName);
    setWeight(UpdatedArrayItem[0].ingredientWeight);
    setCategory(UpdatedArrayItem[0].ingredientCategory);
    setUpdateId(UpdatedArrayItem[0].id);
    setUpdateButton(true);
  };

  const GetIngredientsList = () => {
    console.log("testing this code")
    return axios.get(`http://localhost:8001/api/meals/ingredients/${params.id}`).then((res)=>{
      console.log(res.data)
      setList(res.data)
    })
  }

  useEffect(() => {
    GetIngredientsList()
  },[])

  const HandleUpdateSumbit = (e) => {
    e.preventDefault();
    const UpdatedArrayItem = list.map((item) => {
      if (item.id === updateId) {
        return {
          ...item,
          ingredientName: ingredientName,
          ingredientWeight: ingredientWeight,
          ingredientCategory: ingredientCategory,
        };
      }
      return item;
    });
    setList(UpdatedArrayItem);
    setUpdateButton(false);
    setUpdateId("");
    setIngredient("");
    setWeight("");
    setCategory("");
  };

  const HandleDeleteItem = (id) => {
    const filterArrayItem = list.filter((item) => item.id !== id);
    setList(filterArrayItem);
    toastmessage("User has been Deleted", "success");
  };
  return (
    <Row className="userBackground">
      <Row>
        <Col></Col>
        <Col className="mt-5">
          <h2 className="rounded text-center bg-success text-white w-100">
            Ingredients Form
          </h2>
          <Form onSubmit={updateButton ? HandleUpdateSumbit : HandleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>ingredientName Name: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ingredientName Name"
                value={ingredientName}
                onChange={(e) => {
                  setIngredient(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicWeight">
              <Form.Label>Enter weight in grams: </Form.Label>
              <Form.Control
                type="Integer"
                placeholder="In grams"
                value={ingredientWeight}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCalories">
              <Form.Label>ingredientCategory: </Form.Label>
              <Form.Control
                type="Integer"
                placeholder="Total ingredientCategory"
                value={ingredientCategory}
                onChange={(e) => {
                  setCategory(e.target.value);
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
          <IngredientsList
            list={list}
            updateList={HandleUpdateList}
            deleteItem={HandleDeleteItem}
          />
        </Col>
      </Row>
    </Row>
  );
}

export default Ingredients;
