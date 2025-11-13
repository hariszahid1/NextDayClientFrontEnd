import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CManage.css";
import Table from "./components/Table";


const ClientSubscription = () => {
  const [detail, setDetail] = useState({});
  const params = useParams();
  const [list, setList] = useState([]);


  const getClientData = () => {
    console.log("client subs downloaded:  " + params.id);
    
    return axios
      .get(`http://localhost:8001/api/subscriptions/getclientsubscriptions/${params.id}`)
      .then((res) => {
        setList(res.data);
        console.log(res.data);
      });
  };

  const HandleDelete = (id) => {

  };


  useEffect(() => {
    getClientData();
  }, []);

  return (
    <div className="explore-grid mt-5">
          {/* {list.map((meal, i) => ( */}
          <Table
            Headings= {["targetProtien", "date", "categories", "Delete"]}
            TableMaplist={[
              "targetProtien",
              "date",
              "categories"
            ]}
            GetTableList={list}
            DeleteData={HandleDelete}
            //ViewData={HandleView}
            //EditData={HandleUpdate}
            //AddIngredients={HandleAddIngredient}
          />
        </div>
  );
};

export default ClientSubscription;
