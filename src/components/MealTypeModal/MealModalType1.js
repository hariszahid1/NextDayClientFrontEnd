import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/esm/Table";
import Checkbox from "../Checkbox/Checkbox";
import { Catalogues } from "./mock";
import axios from "axios";
function MealModalType1({ carbs,closeModal, setNewCarbMeal, addedMeal, setAddedMeal }) {
  const [CarbmealList, setCarbMealList] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [mealList, setMealNameList] = useState([]);
  const [list, setList] = useState([]);

  const handleSave = () => {
    setNewCarbMeal(mealList);
  };

  const handleClose = () => {
    closeModal();
  };
  useEffect(() => {
    const GetAllMeals = async () => {
      await axios
        .get(`http://localhost:8001/api/meals/getMeal/All`)
        .then((res) => {
          const mealList = res.data.map((data) => {
            return { ...data, id: data._id, name: data.mealName };
          });
          setList(mealList);
        });
    };
    GetAllMeals();
  }, []);

  // const handleSelectAll = (e) => {
  //   setIsCheckAll(!isCheckAll);
  //   setIsCheck(list.map((li) => li.id));
  //   if (isCheckAll) {
  //     setIsCheck([]);
  //   }
  // };

  const handleClick = (e) => {
    const { id, checked, name } = e.target;
    setIsCheck([...isCheck, id]);
    setMealNameList([...mealList, { id: id, mealName: name }]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
      setMealNameList(mealList.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <Modal show={carbs} onHide={handleClose}>
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
                      <th>#</th>
                      <th>Meal Name</th>
                    </tr>
                  </thead>
                  {/* <Checkbox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                  />
                  Select All */}

                  {list.map(({ id, name }) => {
                    return (
                      <tbody>
                        <tr>
                          <td>
                            <Checkbox
                              key={id}
                              type="checkbox"
                              name={name}
                              id={id}
                              handleClick={handleClick}
                              isChecked={isCheck.includes(id)}
                            />
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

export default MealModalType1;
