import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/esm/Table";
import axios from "axios";
function SubscriptionThursdayMealModal({ ThursdayMeal, setThursday, closeModal }) {
  const [list, setList] = useState([]);
  const [mealist, setMeallist] = useState([]);
  const handleSave = () => {
    setThursday(mealist)
    closeModal();
  };
  const HandleChange = (e) => {
    console.log(e.target.value, e.target.name, "name-value")
    const meals = [...mealist];
    const checkmeals = meals.map((value) => value.name);
    if (!checkmeals.includes(e.target.name)) {
      meals.push({ count: e.target.value, name: e.target.name })
      setMeallist(meals)
    }
  }

  const handleClose = () => {
    closeModal();
  };
  useEffect(() => {
    const GetAllMeals = async () => {
      await axios
        .get(`http://localhost:8001/api/meals/getMeal/All`)
        .then((res) => {
          const mealList = res.data.map((data) => {
            return { ...data, name: data.mealName };
          });
          setList(mealList);
        });
    };
    GetAllMeals();
  }, []);


  return (
    <>
      <Modal show={ThursdayMeal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Meal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Row>
              <Col>
                <Table striped bordered hover className=" table table-striped">
                  <thead>
                    <tr>
                      <th>No of Meals</th>
                      <th>Meal Name</th>
                    </tr>
                  </thead>
                  {list.map(({ id, name }) => {
                    return (
                      <tbody>
                        <tr>
                          <td>

                            <input type="number" min={1} name={name} onChange={(e) => { HandleChange(e) }} />
                          </td>
                          <td>{name}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
              </Col>
            </Row>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SubscriptionThursdayMealModal;
