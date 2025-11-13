import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./IngredientsList.css";
const IngredientsList = ({ list,updateList,deleteItem }) => {
  return (
    <Row>
      <Col md={1}></Col>
      <Col className="bg-white rounded">
        <Row>
          <h2 className="text-center bg-success text-white w-100">IngredientsList</h2>
        </Row>
        <div className="mainList">
          {list.length>0 &&list.map((Ingredient) => {
            return (
              <Row className="align-items-center p-2" key={Ingredient._id}>
                <Col md={8}>     {Ingredient.ingredientName}     |     {Ingredient.ingredientWeight}     |     {Ingredient.ingredientCategory}</Col>
                <Col md={2}>
                  <Button className="btn btn-info" onClick={()=>{updateList(Ingredient._id)}}>Edit</Button>
                </Col>
                <Col md={2}>
                  <button className="btn btn-danger" onClick={()=>{deleteItem(Ingredient._id)}}>Delete</button>
                </Col>
              </Row>
            );
          })}
          {list.length===0 && 
          <h2 className="text-center  w-100">No Data</h2>
        }
        </div>
      </Col>
      <Col md={1}></Col>
    </Row>
  );
};

export default IngredientsList;
