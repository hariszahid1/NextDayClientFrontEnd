import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Subscription.css";
import ReUseAbleTable from "../../components/CategoryTable/Table";
import { TableData } from "./TableData";
import AlertModal from "../../components/AlertModal/AlertModal";
import { toastmessage } from "../../components/ToastMessage/toast";
import { getAllClients, deleteClient } from "../../utils/Apis";
function Subscription() {
  const [list, setList] = useState([]);
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");

  const Navigate = useNavigate();

  const addSubscription = () => {
    Navigate("/subscription/add");
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
    Navigate(`/subscription/detailsubsciption/${id}`);
  };
  const HandleUpdate = (id) => {
    Navigate(`/subscrition/edit/${id}`);
  };

  const HandleClosePopup = async (value) => {
    if (value === "delete") {
      await axios.delete(`${deleteClient}/${id}`).then((res) => {
        toastmessage(res.data, "success");
        setPopup(false);
        GetAllMeals();
      });
    }

    if (value === "close") {
      setPopup(false);
    }
  };
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
  const GetAllMeals = async () => {
    await axios.get(getAllClients).then((res) => {
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
              Subscriptions Category
            </Button>
            <Button
              className="btn btn-info text-white mt-2"
              onClick={ManageMeasurement}
            >
              {" "}
              Subscriptions Measure
            </Button>
          </Col>
          <Col md={8}>
            <h1 className="text-center text-danger font-weight-bold meal-heading">
              Subscriptions List
            </h1>
          </Col>
          <Col md={2}>
            <Button className="btn btn-info ml-2 text-white" onClick={addSubscription}>
              + Add New Subscriptions
            </Button>
          </Col>
        </Row>

        <div className="explore-grid mt-5">
          <ReUseAbleTable
            TableData={TableData}
            TableMaplist={["clientId", "clientName", "phoneNumber"]}
            GetTableList={list}
            onChangeValue={HandleChangeValue}
          />
        </div>
      </Col>
      <AlertModal popup={popup} setPopup={HandleClosePopup} />
    </Row>
  );
}

export default Subscription;
