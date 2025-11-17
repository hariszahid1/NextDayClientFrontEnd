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
import { BASEURL } from '../../utils/Apis';
function RoundTypeModal({
  carbs,
  closeModal,
  setNewCarbMeal,
  addedMeal,
  setAddedMeal,
  menuButton,
  setChicken,
  setBeef,
}) {
  const [CarbmealList, setCarbMealList] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  //   const [categoryList, setCategoryList] = useState([]);
  const [list, setList] = useState([]);
  // console.log(menuButton);
  // console.log(categoryList)
  const { categoryList, setCategoryList } = useContext(preRoundContext);
  const handleSave = () => {
    // localStorage.setItem(menuButton, JSON.stringify(categoryList));
    setCategoryList(categoryList);
    closeModal();
  };

  const handleClose = () => {
    // setCategoryList([]);
    closeModal();
  };
  console.log("Menu Button",menuButton);
  useEffect(() => {
    const GetAllCategory = async () => {
      await axios
        .get(`${BASEURL}/meals/getMeals/category/${menuButton}`)
        .then((res) => {
          const categoryList = res.data.map((data) => {
            return { ...data, id: data._id };
          });
          setList(categoryList);
          console.log("From Api", list);
        }).catch((err) => console.log(err));;
    };
    GetAllCategory();
  }, [menuButton]);
  function menuExists(menuButton) {
    return categoryList.some(function (el) {
      return el.mealCategory === menuButton;
    });
  }

  const handleClick = (e) => {
    var mealCarbs = [];
    if (menuButton == "Chicken") {
      var mealCarbs = list.map((item) => item.carbs);
    }
    var mealCategory = list.mealCategory;
    const { id, checked, name } = e.target;
    const catCheck = menuExists(menuButton);
    console.log("iM BOOL", catCheck);
    console.log("IM MEAL", mealCarbs);
    if (isCheck.length != 0 && catCheck == true) {
      console.log("Im in if");
      toastmessage("Only One Option Can be Selected", "error");
      //   setIsCheck([]);
      closeModal();
    } else {
      setIsCheck([...isCheck, id]);
      setCategoryList([
        ...categoryList,
        {
          mealId: id,
          mealName: name,
          MealCarbs: mealCarbs,
          mealCategory: menuButton,
          boxNumber: 0,
        },
      ]);
    }

    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
      setCategoryList(categoryList.filter((item) => item.id !== id));
    }
  };
  console.log("New List", categoryList);
  return (
    <>
      <Modal show={carbs} onHide={handleClose}>
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

                  {list.map(({ id, mealName }) => {
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

export default RoundTypeModal;
