import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { toastmessage } from "../../../../components/ToastMessage/toast";
import "./ClientForm.css";
import Table from "react-bootstrap/Table";
import { AddClients, UpdateClient } from "../../../../utils/Apis";
const MealList = [
  {
    id: 1,
    clientId: "otto",
  },
  {
    id: 2,
    clientId: "kfc",
  },
];
function ClientForm(props) {
  const { addClient, client, editMeal } = props;
  const [clientId, setClientId] = useState();
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [id, setId] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCountry, setSelectedCountry] = useState('+966')
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(clientId, clientName, phoneNumber)
    if (addClient) {
      const addClientObj = {
        clientId,
        clientName,
        phoneNumber: selectedCountry + phoneNumber
      };
      const header = { "Content-Type": "application/json" };
      await axios
        .post(AddClients, addClientObj, header)
        .then((res) => {
          toastmessage("New Client is Created!", "success");

          navigate("/clients");
        })
        .catch((err) => {
          toastmessage(err.response.data.error, "error");
        });
    } else {
      const addClientObj = {
        clientId,
        clientName,
        phoneNumber: phoneNumber
      };
      console.log(addClientObj, "addClient");
      const header = { "Content-Type": "application/json" };
      await axios
        .patch(
          `${UpdateClient}/${id}`,
          addClientObj,
          header
        )
        .then((res) => {
          toastmessage("Client Record Updated Successfully!", "success");

          navigate("/clients");
        })
        .catch((err) => {
          toastmessage(err.response.data.error, "error");
        });
    }
  };
  useEffect(() => {
    if (editMeal) {
      setClientId(client.clientId);
      setClientName(client.clientName);
      setPhoneNumber(client.phoneNumber);
      setId(client._id);
    }
  }, [props.client]);

  const countryOptions = [
    { label: 'Saudi Arabia (+966)', value: '+966' },
    // Add other country options here
    { label: 'United States (+1)', value: '+1' },
    { label: 'United Kingdom (+44)', value: '+44' },
    // Add more countries as needed
  ];
console.log(phoneNumber);

  return (
    <Row className="max-width explore-section">
      <Col>
        <Row className="well m-4">
          <h2 className="rounded w-100 ml-3">
            {addClient ? "Add Client Form" : "Edit Client Form"}
          </h2>

          <Col>
            <Form className="p-3 " onSubmit={HandleSubmit}>
              <Row className="mb-3">

                <Form.Group as={Col} controlId="formGridMealName">
                  <Form.Label>Client Id</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Client Id"
                    value={clientId}
                    onChange={(e) => {
                      setClientId(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridMealDescription">
                <Form.Label>Client Description</Form.Label>
                <Form.Control
                  placeholder="Enter Client Description"
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                  }}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Phone Number</Form.Label>
                  <div style={{display: "flex"}}> 
                  <div style={{width: "30%"}}>
                    <Select
                      options={countryOptions}
                      value={countryOptions.find(option => option.value === selectedCountry)}
                      onChange={selectedOption => setSelectedCountry(selectedOption.value)}
                    />
                  </div>
                  <div style={{width: "70%"}}>
                  <Form.Control
                    type="number"
                    placeholder="Enter Phone Name"
                    value={phoneNumber}
                    onChange={(e) => {
                      const { value } = e.target;
                      setPhoneNumber(value);
                     
                    }}
                  />
                  </div>
                  
                </div>

                </Form.Group>


              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Age"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </Form.Group>

              </Row>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select" value={gender} onChange={(e) => {
                      setGender(e.target.value);
                    }}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Location"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </Form.Group>

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

export default ClientForm;
