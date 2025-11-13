import React from "react";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./Card.css";
import { useNavigate} from "react-router-dom"
import axios from 'axios'
import { toastmessage } from "../../components/ToastMessage/toast";


const Card = ({ meal, i,UpdateList }) => {
  const Navigate = useNavigate();

  const name = meal?.mealName;
  const desc = meal?.mealDesc;
  const mealTypeName = meal?.mealType;
  // const mealTypeDesc = restaurant?.mealType?.desc;
  // const indreginetsName = restaurant?.ingredients?.name;
  // const indreginetsDesc = restaurant?.ingredients?.weight;

  const deleteMeal = async (id) => {
    await axios.delete(`http://localhost:8001/api/meals/deletemeal/${id}`).then((res) => {
        console.log(res.data);
    })
    toastmessage("Meal has been Deleted", "success");

    UpdateList()
  };

const handleView = (id) => {
  Navigate(`/Meal/Ingredients/${id}`);
};

  return (
    <div className={`explore-card cur-po`}>
      <div className="res-row">
        <div className="res-name">{name}</div>
      </div>
      <div className="res-row">
        <div className="res-cuisine">
          <span className="res-cuisine-tag">{desc}</span>
        </div>
      </div>
      <div className="res-row">
        <div className="res-cuisine">
          <span className="res-type">Meal Type:</span>
        </div>
      </div>
      <div className="res-row">
          <span className="res-cuisine-tag">Name</span>
        <div className="res-price">Desc</div>
      </div>
      <div className="res-row">
          <span className="res-cuisine-tag">{mealTypeName}</span>
        {/* <div className="res-price">{mealTypeDesc}</div> */}
      </div>
      <div className="res-row">
        <div className="res-cuisine">
          <span className="res-type">Meal Ingredients:</span>
        </div>
      </div>
      <div className="res-row">
          <span className="res-cuisine-tag">Name</span>
        <div className="res-price">Weight</div>
      </div>
      <div className="res-row">
          {/* <span className="res-cuisine-tag">{indreginetsName}</span>
        <div className="res-price">{indreginetsDesc}gram</div> */}
      </div>
      <Row>
        <Col>
        <Button className="btn btn-info" onClick={()=>{handleView(meal._id)}}>Edit</Button>
        </Col>
        <Col>
        {/* <Button className="btn btn-success">Order</Button> */}
        </Col>
        <Col>
        <Button className="btn btn-danger" onClick={()=>{deleteMeal(meal._id)}}>Delete</Button>

        </Col>
      </Row>
    </div>
  );
};

export default Card;
