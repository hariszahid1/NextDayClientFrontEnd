import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/esm/Table";
import Checkbox from "../Checkbox/Checkbox";
import axios from "axios";
function SubTypeModal({
  carbs,
  closeModal,
  setNewCarbMeal,
  addedMeal,
  setAddedMeal,
  menuButton,
  setMondayMeal,
  setTuesdayMeal,
  setWednesdayMeal,
  setThursdayMeal,
  setFridayMeal,
  setSatursdayMeal,
  setSundayMeal,
}) {
  const [CarbmealList, setCarbMealList] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [list, setList] = useState([]);
  // console.log(menuButton);
  // console.log(categoryList)

  const handleSave = () => {
    if (menuButton == "Monday") {
      setMondayMeal(categoryList);
    }
    if (menuButton == "Tuesday") {
      setTuesdayMeal(categoryList);
    }
    if (menuButton == "Wednesday") {
      setWednesdayMeal(categoryList);
    }
    if (menuButton == "Thursday") {
      setThursdayMeal(categoryList);
    }
    if (menuButton == "Friday") {
      setFridayMeal(categoryList);
    }
    if (menuButton == "Satursday") {
      setSatursdayMeal(categoryList);
    }
    if (menuButton == "Sunday") {
      setSundayMeal(categoryList);
    }
  };

  const handleClose = () => {
    setCategoryList([]);
    closeModal();
  };
  useEffect(() => {
    const GetAllCategory = async () => {
      await axios
        .get(`http://localhost:8001/api/meals/lookups/mealCategory/getAll`)
        .then((res) => {
          const categoryList = res.data.map((data) => {
            return { ...data, id: data._id, name: data.categoryName };
          });
          setList(categoryList);
        });
    };
    GetAllCategory();
  }, []);

  const handleClick = (e) => {
    const { id, checked, name } = e.target;
    setIsCheck([...isCheck, id]);
    setCategoryList([
      ...categoryList,
      { id: id, mealName: name, inputValue: 1 },
    ]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
      setCategoryList(categoryList.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <Modal show={carbs} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Row>
              <Col>
                <Table striped bordered hover className=" table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Category Name</th>
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

export default SubTypeModal;
