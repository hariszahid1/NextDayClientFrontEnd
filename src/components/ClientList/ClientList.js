import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./ClientList.css";
const ClientList = ({ list,updateList,deleteItem, viewItem }) => {
  return (
    <Row>
      <Col md={1}></Col>
      <Col className="bg-white rounded">
        <Row>
          <h2 className="text-center bg-success text-white w-100">UserList</h2>
        </Row>
        <div className="mainList">
          {list.length>0 &&list.map((client) => {
            return (
              <Row className="align-items-center p-2" key={client.id}>
                <Col md={8}>{client.clientId}</Col>
                <Col md={8}>{client.name}</Col>
                <Col md={8}>{client.phoneNumber}</Col>
                <Col md={2}>
                  <Button className="btn btn-info" onClick={()=>{updateList(client._id)}}>Edit</Button>
                </Col>
                <Col md={2}>
                  <button className="btn btn-danger" onClick={()=>{deleteItem(client._id)}}>Delete</button>
                </Col>
                <Col md={3}>
                  <button className="btn btn-danger" onClick={()=>{viewItem(client.clientId)}}>View</button>
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

export default ClientList;
