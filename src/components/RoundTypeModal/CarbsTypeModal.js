import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/esm/Table";
import Checkbox from "../Checkbox/Checkbox";
import { useContext } from "react";
import { preRoundContext } from "../../Contexts/PreRound";
import { toastmessage } from "../../components/ToastMessage/toast";

import axios from "axios";
function CarbsTypeModal({
  carbs2,
  closeModal,
  setNewCarbMeal2,
  addedMeal2,
  setAddedMeal2,
  addOnId,
}) {
  const [CarbmealList, setCarbMealList] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  //   const [categoryList, setCategoryList] = useState([]);
  const [list, setList] = useState([]);
  // console.log(menuButton);
  // console.log(categoryList)
  const { carbsList, setCarbsList, categoryList } = useContext(preRoundContext);
  const handleSave = () => {
    // localStorage.setItem(menuButton, JSON.stringify(categoryList));
    setCarbsList(carbsList);
    closeModal();
  };

  const handleClose = () => {
    // setAddOnList([]);
    closeModal();
  };
  //   console.log(menuButton);
  // useEffect(() => {
  //   const GetAllCategory = async () => {
  //     await axios
  //       .get(`http://localhost:8001/api/meals/getMeals/addons`)
  //       .then((res) => {
  //         const carbsList = res.data.map((data) => {
  //           return { ...data, id: data._id };
  //         });
  //         setCarbsList(carbsList);
  //         console.log("From Api", carbsList);
  //       });
  //   };
  //   GetAllCategory();
  // }, []);
  // function menuExists(mealName) {
  //   return carbsList?.some(function (el) {
  //     return el.mealName === mealName;
  //   });
  // }
  const handleClick = (e) => {
    const { id, checked, name } = e.target;
    // console.log("Name", mealCategory);
    // const mealCheck = menuExists(name);
    // console.log(mealCheck);
    if (isCheck.length != 0) {
      toastmessage(
        "Only One Option Can be Selected Or Option is already existed",
        "error"
      );
      setIsCheck([]);
      closeModal();
    } else {
      setIsCheck([...isCheck, id]);
      // carbsList.filter((item) => {
      //   if (item.id === addOnId) {
      //     item.mealId = id;
      //     item.mealName = name;
      //     item.mealCategory = "carbs";
      //   }

      //   // return item;
      // });
      setCarbsList([
        { mealId: id, mealName: name, boxNumber: 0, mealCategory: "Carbs" },
      ]);
      //   setAddOnList([
      //     ...addOnList,
      //     {
      //       mealId: id,
      //       mealName: name,
      //       mealCategory: "AddOn",
      //       boxNumber: 0,
      //     },
      //   ]);
      if (!checked) {
        setIsCheck(isCheck.filter((item) => item !== id));
        setCarbsList(carbsList.filter((item) => item.id !== id));
      }
    }
  };
  const chickenCarbs = categoryList.filter((obj) => obj.mealCategory == "Chicken")
    .map((item) => item.MealCarbs);
  var newArray = Array.prototype.concat.apply([], chickenCarbs[0]);
  const arrayOfObjects = chickenCarbs.reduce((acc, curr) => {
    return acc.concat(curr.map((item) => ({ ...item })));
  }, []);
  const output = [].concat(...chickenCarbs);

  console.log("Chicken Carbs", newArray);
  console.log("New Carbs List", carbsList);
  return (
    <>
      <Modal show={carbs2} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Meal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Row>
              <Col>
                <Table striped bordered hover className=" table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Carbs Name</th>
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

                  {newArray.map(({ id, mealName }) => {
                    return (
                      <tbody>
                        <tr>
                          <td>
                            <Checkbox
                              key={id}
                              type="checkbox"
                              name={mealName}
                              id={id}
                              handleClick={handleClick}
                            />
                          </td>
                          <td>{mealName}</td>
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

export default CarbsTypeModal;
