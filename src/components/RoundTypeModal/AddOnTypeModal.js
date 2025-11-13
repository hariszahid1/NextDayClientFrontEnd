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
function AddOnTypeModal({
  carbs1,
  closeModal,
  setNewCarbMeal1,
  addedMeal1,
  setAddedMeal1,
  addOnId,
}) {
  const [CarbmealList, setCarbMealList] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  //   const [categoryList, setCategoryList] = useState([]);
  const [list, setList] = useState([]);
  // console.log(menuButton);
  // console.log(categoryList)
  const { addOnList, setAddOnList } = useContext(preRoundContext);
  const handleSave = () => {
    // localStorage.setItem(menuButton, JSON.stringify(categoryList));
    setAddOnList(addOnList);
    closeModal();
  };

  const handleClose = () => {
    // setAddOnList([]);
    closeModal();
  };
  //   console.log(menuButton);
  useEffect(() => {
    const GetAllCategory = async () => {
      await axios
        .get(`http://localhost:8001/api/meals/getMeals/addons`)
        .then((res) => {
          const addOnList = res.data.map((data) => {
            return { ...data, id: data._id };
          });
          setList(addOnList);
          console.log("From Api", list);
        });
    };
    GetAllCategory();
  }, []);
  function menuExists(mealName) {
    return addOnList.some(function (el) {
      return el.mealName === mealName;
    });
  }
  const handleClick = (mealCategory) => (e) => {
    const { id, checked, name } = e.target;
    console.log("Name", mealCategory);
    const mealCheck = menuExists(name);
    console.log(mealCheck);
    if (isCheck.length != 0 && mealCheck == true) {
      toastmessage(
        "Only One Option Can be Selected Or Option is already existed",
        "error"
      );
      setIsCheck([]);
      closeModal();
    } else {
      setIsCheck([...isCheck, id]);
      addOnList.filter((item) => {
        if (item.id === addOnId) {
          item.mealId = id;
          item.mealName = name;
          item.mealCategory = mealCategory;
        }

        // return item;
      });
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
        setAddOnList(addOnList.filter((item) => item.id !== id));
      }
    }
  };

  console.log("New List from addon module", addOnList);
  return (
    <>
      <Modal show={carbs1} onHide={handleClose}>
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

                  {list.map(({ id, mealName, mealCategory }) => {
                    return (
                      <tbody>
                        <tr>
                          <td>
                            <Checkbox
                              key={id}
                              type="checkbox"
                              name={mealName}
                              name1={mealCategory}
                              id={id}
                              handleClick={handleClick(mealCategory)}
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

export default AddOnTypeModal;
