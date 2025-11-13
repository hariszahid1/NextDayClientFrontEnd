import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserList from "../../components/UserList/UserList";
import ListCategories from "./CategoryList.json";
// import { toastmessage } from "../../components/ToastMessage/toast";
// import "./User.css";

function MealCategory() {
  const [list, setList] = useState(ListCategories);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [updateButton, setUpdateButton] = useState(false);
  const [defaultSizeCheckbox, setdefaultSizeCheckbox] = useState(false);

  const HandleSubmit = (e) => {
    e.preventDefault();
    const id = list.length + 1;
    const addMealCategory = {
      // id,
      categoryName,
      categoryDesc,
    };
    // const newlist = [...list];
    // newlist.push(addUser);
    // setList(newlist);
    // toastmessage("New User Created Successfully", "success");

    // console.log(list);
  };
  const HandleUpdateList = (id) => {
    // const UpdatedArrayItem = list.filter((item) => item.id === id);
    // setUsername(UpdatedArrayItem[0].MealCategory);
    // setPassword(UpdatedArrayItem[0].password);
    // setUpdateId(UpdatedArrayItem[0].id)
    // setUpdateButton(true);
  };
  const HandleUpdateSumbit = (e) => {
    // e.preventDefault();
    // const UpdatedArrayItem = list.map((item) => {
    //   if (item.id === updateId) {
    //     return { ...item, username: username, password: password };
    //   }
    //   return item;
    // });
    // setList(UpdatedArrayItem)
    // setUpdateButton(false);
    // setUsername("");
    // setPassword("");
  };

  const HandleDeleteItem = (id) => {
    // const filterArrayItem = list.filter((item) => item.id !== id);
    // setList(filterArrayItem);
    // toastmessage("User has been Deleted", "success");
  };
  return (
    <Row className="userBackground">
      <Row>
        <Col></Col>
        <Col className="mt-5">
          <h2 className="rounded text-center bg-success text-white w-100">
            Meal Category Management
          </h2>
          <Form onSubmit={updateButton ?HandleUpdateSumbit : HandleSubmit  }>
            <Form.Group className="mb-3" controlId="formBasicCategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category Name"
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategoryDesc">
              <Form.Label>Category Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category Description"
                value={categoryDesc}
                onChange={(e) => {
                  setCategoryDesc(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategoryDefaultSize">
              <Form.Label>is there a default portion size?</Form.Label>
              <Form.Control
                type="checkbox"
                placeholder="Is there a default portion size?"
                value={defaultSizeCheckbox}
                onChange={(e) => {
                  setdefaultSizeCheckbox(e.target.value);
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
          <UserList
            list={list}
            updateList={HandleUpdateList}
            deleteItem={HandleDeleteItem}
          />
        </Col>
      </Row>
    </Row>
  );
}

export default MealCategory;
