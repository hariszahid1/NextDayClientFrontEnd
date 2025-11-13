import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ClientList from "../../components/ClientList/ClientList";
import { useNavigate } from "react-router-dom";
import { toastmessage } from "../../components/ToastMessage/toast";
import "./Client.css";
import axios from "axios";

function Client() {
  const [list, setList] = useState([]);
  //const [clientId, setClientId] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [updateButton, setUpdateButton] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const Navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    let clientId =1
   if(list.length > 0 ){
    clientId = list.at(-1).clientId + 1
   }
  

    const addNew = {clientId, name, phoneNumber};
    const header = { "Content-Type": "application/json" };

    await axios.post(`http://localhost:8001/api/clients/addclient`, addNew, header).then((res)=>{
      console.log(res.data)
    })

    GetAllClients();
  };

  const HandleUpdateList = async (id) => {
    console.log(id)
      await axios.patch(`http://localhost:8001/api/clients/updateclient/${id}`).then((res)=>{
        //setClientId(res.data.clientId)
        setName(res.data.name)
        setPhoneNumber(res.data.phoneNumber)
    })
   };

   const HandleViewList = async (id) => {
    Navigate(`/clients/manage/${id}`);
   };

 const HandleUpdateSumbit = async (id) => {
    console.log("this is triggered")
   };



   

  const HandleDeleteItem = async (id) => {
    await axios.delete(`http://localhost:8001/api/clients/deleteclient/${id}`);
    GetAllClients()
    toastmessage("User has been Deleted", "success");
  };
  const GetAllClients = async () => {
    await axios
      .get(`http://localhost:8001/api/clients/getallclients`)
      .then((res) => {
        setList(res.data);
      });
  };
  useEffect(() => {
    GetAllClients();
  }, []);

  return (
    <Row className="userBackground">
      <Row>
        <Col></Col>
        <Col className="mt-5">
          <h2 className="rounded text-center bg-success text-white w-100">
            Clients Center
          </h2>
          <Form onSubmit={updateButton ?HandleUpdateSumbit : HandleSubmit  }>
          {/* <Form.Group className="mb-3" controlId="formBasicClientId">
              <Form.Label>ClientId</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ClientId"
                value={clientId}
                onChange={(e) => {
                  //setClientId(e.target.value);
                }}
              />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
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
          <ClientList
            list={list}
            updateList={HandleUpdateList}
            deleteItem={HandleDeleteItem}
            viewItem={HandleViewList}
          />
        </Col>
      </Row>
    </Row>
  );
}

export default Client;