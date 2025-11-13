import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ClientCrud.css";

const DetailClient = () => {
  const [detail, setDetail] = useState({});
  const params = useParams();
  const getDetailMeal = () => {
    console.log("testing this code");
    return axios
      .get(`http://localhost:8001/api/meals/getMeal/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
      });
  };

  useEffect(() => {
    getDetailMeal();
  }, []);
  return (
    <Row className="max-width explore-section">
      <Col className="m-4">
        <Row className="well mt-3">
          <h2 className="rounded w-100 ml-3"> Meal Detail</h2>
          <Col>
            <Row>
              <Col>
                <h4>Meal Name</h4>
                <p>{detail.mealName}</p>
              </Col>
              <Col>
                <h4>Meal Desciption</h4>
                <p>{detail.mealDesciption}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Meal Category</h4>
                <p>{detail.mealCategory}</p>
              </Col>
              <Col>
                <h4>Increment</h4>
                <p>{detail.increment}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Meal Ingredients</h4>
                <p>
                  {detail.ingredients&&detail.ingredients.map((ingredients) => {
                    return (
                      <>
                        <p>Ingredient Category</p>
                        <p>{ingredients.ingredientCategory}</p>
                        <p>Ingredient Name</p>
                        <p>{ingredients.ingredientName}</p>
                        <p>Ingredient Weight</p>
                        <p>{ingredients.ingredientWeight}</p>
                      </>
                    );
                  })}
                </p>
              </Col>
              <Col>
                <h4>Meal Carbs</h4>
                <p>
                  {detail.carbs&&detail.carbs.map((data, index) => `${index}:` + data + "  ")}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Min Serving Proteins</h4>
                <p>{detail.minservingprotein}</p>
              </Col>
              <Col>
                <h4>Max Serving</h4>
                <p>{detail.maxserving}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Measurement Unit</h4>
                <p>{detail.measurementUnit}</p>
              </Col>
              <Col>
                <h4>Min Serving(e.g:30)</h4>
                <p>{detail.minServing}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Min Serving Carbs</h4>
                <p>{detail.minservingCarbs}</p>
              </Col>
              <Col>
                <h4>Min Serving Fats</h4>
                <p>{detail.minservingfat}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DetailClient;
