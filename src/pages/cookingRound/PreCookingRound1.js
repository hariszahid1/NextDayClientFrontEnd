import React, { useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useContext } from "react";
import { preRoundContext } from "../../Contexts/PreRound";
import { SiAddthis } from "react-icons/si";
import { Button } from "react-bootstrap";
import RoundTypeModal from "../../components/RoundTypeModal/RoundTypeModal";
import { AiOutlineClose } from "react-icons/ai";
import moment from "moment";
import AddOnTypeModal from "../../components/RoundTypeModal/AddOnTypeModal";
import { toastmessage } from "../../components/ToastMessage/toast";
import axios from "axios";
import CarbsTypeModal from "../../components/RoundTypeModal/CarbsTypeModal";
import "./preRound1.css"
const PreCookingRound1 = () => {
  const {
    preRoundData,
    categoryList,
    setCategoryList,
    addOnList,
    setAddOnList,
    startDate,
    endDate,
    carbsList,
    setCarbsList,
  } = useContext(preRoundContext);
  const [menuButton, setMenuButton] = useState("");
  const totalRound = parseInt(localStorage.getItem("roundId"));
  const [addCarbMeal, setAddCarbMeal] = useState(false);
  const [addedMeal, setAddedMeal] = useState([]);
  const [addCarbMeal1, setAddCarbMeal1] = useState(false);
  const [addCarbMeal2, setAddCarbMeal2] = useState(false);
  const [addedMeal1, setAddedMeal1] = useState([]);
  const [addedMeal2, setAddedMeal2] = useState([]);
  const [chicken, setChicken] = useState([]);
  const [beef, setBeef] = useState([]);
  const [carbs, setCarbs] = useState([]);
  const [carbs1, setCarbs1] = useState([]);
  const [carbs2, setCarbs2] = useState([]);
  const [addOn, setAddOn] = useState([]);
  const [meals, setMeals] = useState([]);
  const [sum, setSum] = useState([]);
  const [addOnId, setAddOnId] = useState(0);
  console.log("AddOn Id:addOnId", addOnId);
  const HandleCarbMeal = (data) => {
    setAddedMeal(data);
    setCarbs(data);
    setAddCarbMeal(false);
  };
  const HandleCarbMeal1 = (data) => {
    setAddedMeal1(data);
    setCarbs1(data);
    setAddCarbMeal1(false);
  };
  const HandleCarbMeal2 = (data) => {
    setAddedMeal2(data);
    setCarbs2(data);
    setAddCarbMeal2(false);
  };
  const removeAddOnMenu = (index) => {
    const newMenu = addOnList.filter((_, i) => i !== index);
    // setAddOn(newMenu);
    setAddOnList(newMenu);
  };
  console.log("ADD ON LIST", addOnList);
  const HandleAddMeal = () => {
    setAddCarbMeal(true);
  };
  const HandleAddMeal1 = () => {
    setAddCarbMeal1(true);
  };
  const HandleAddMeal2 = () => {
    setAddCarbMeal2(true);
  };
  const AddNewFood = () => {
    const Id = Math.floor(Math.random() * 100);
    setAddOnList([
      ...addOnList,
      {
        id: Id,
        food: "Add On",
        boxNumber: 0,
        mealId: 0,
        mealName: " ",
        mealCategory: " ",
      },
    ]);
  };
  const handleAddOnState = (id) => (event) => {
    setAddOn((inputs) =>
      inputs.map((input) =>
        input.id === id
          ? {
              ...input,
              RowNumber: parseInt(event.target.value),
            }
          : input
      )
    );
  };
  //   var output = [];
  console.log("PRE ROUND DATA", preRoundData);
  const calculateTotal = () => {
    const value = preRoundData?.subs.map(({ categories }) =>
      categories.map((data) => data.categoryName)
    );
    var newArray = Array.prototype.concat.apply([], value);
    console.log(newArray);
    var NewValue = newArray.reduce(
      (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
      {}
    );
    setSum(NewValue);
  };
  console.log("Sum", sum);
  function getMeal(item) {
    console.log(item);
    const meal = JSON.parse(localStorage.getItem(item));
    setMeals([...meals, meal]);
    // console.log(output);
  }
  console.log("OUTPUT", meals);
  console.log(preRoundData);
  var output = [];
  var unique = preRoundData.subs?.map(({ categories }) =>
    categories.map((item) => output.push(item.categoryName))
  );
  function removeDuplicates(array) {
    return array.filter(function(item, index) {
      return array.indexOf(item) === index;
    });
  }
  const handleBoxNumber = (item) => (event) => {
    console.log(item);
    setCategoryList((inputs) =>
      inputs.map((input) =>
        input.mealCategory === item
          ? {
              ...input,
              boxNumber: parseInt(event.target.value),
            }
          : input
      )
    );
    setCarbsList((inputs) =>
      inputs.map((input) =>
        input.mealCategory === "Carbs"
          ? {
              ...input,
              boxNumber: parseInt(event.target.value),
            }
          : input
      )
    );
  };
  const handleBoxNumber1 = (id) => (event) => {
    console.log(id);
    setAddOnList((inputs) =>
      inputs.map((input) =>
        input.id === id
          ? {
              ...input,
              boxNumber: parseInt(event.target.value),
            }
          : input
      )
    );
  };
  console.log("CAT LIST", categoryList);
  console.log("output", output);

  var result = removeDuplicates(output);
  console.log(result);
  const categoryListObj = categoryList.map((item) => {
    return {
      mealId: item.mealId,
      mealCategory: item.mealCategory,
      boxNumber: item.boxNumber,
    };
  });
  const addOnListObj = addOnList.map((item) => {
    return {
      mealId: item.mealId,
      mealCategory: item.mealCategory,
      boxNumber: item.boxNumber,
    };
  });
  const carbsListObj = carbsList.map((item) => {
    return {
      mealId: item.mealId,
      mealCategory: item.mealCategory,
      boxNumber: item.boxNumber,
    };
  });
  console.log("Final ADD oN List", addOnListObj);
  //handle submit
  const handleSubmit = async () => {
    const finalObj = [...categoryListObj, ...addOnListObj, ...carbsListObj];
    const addRound = {
      newRoundId: preRoundData.newRoundId,
      startDate: startDate,
      endDate: endDate,
      mealsPlan: finalObj,
    };
    console.log("FINAL API DATA", addRound);

    const header = { "Content-Type": "application/json" };
    await axios
      .post(`${BASEURL}/rounds/createround`, addRound, header)
      .then((res) => {
        toastmessage("New Round is Created!", "success");
      })
      .catch((err) => {
        toastmessage(err.response.data.error, "error");
      });
  };
  //---handle sumbit
  const chickenCarbs = categoryList
    ?.filter((obj) => obj.mealCategory == "Chicken")
    .map((item) => {
      return {
        mealCarbs: item.MealCarbs,
      };
    });
  console.log("Chciken Carbs", chickenCarbs);
  console.log("CarbsListInput", carbsList);
  return (
    <div className="Rounds" style={{overflow: "hidden"}}>
      {output.length != 0 ? (
          <div>
<Row style={{ marginLeft: "200px" }}>
        <Col
          style={{
            marginLeft: "20px",
            paddingTop: "150px",
            color: "#272d36",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          Round ID:
          {preRoundData.newRoundId}
        </Col>
        <Col>
          <div class="visual">
            <img
              src="https://raw.githubusercontent.com/programmercloud/foodlover/main/img/home-banner.png"
              alt=""
              width="400px"
            />
          </div>
        </Col>
      </Row>
      <Row className="MainRow">
        {result.length != 0 ? (
          result.map((item) => {
            return (
              <Col
                className="MainCol1"
                style={{ flexBasis: "50%", boxSizing: "border-box" }}
              >
                <br />
                <br />

                <Row style={{ marginLeft: "20px" }}>
                  <Col>
                    <Row style={{ marginLeft: "2px" }}>{item}</Row>
                    <Row>
                      {categoryList
                        ?.filter((obj) => obj.mealCategory == item)
                        .map((data, index) => {
                          return (
                            <div key={data.id} style={{ marginTop: "20px" }}>
                              <div
                                style={{
                                  paddingLeft: "20px",
                                  paddingRight: "30px",
                                  paddingTop: "8px",
                                }}
                                className="category"
                              >
                                {data.mealName}
                              </div>
                            </div>
                          );
                        })}
                    </Row>
                    {item == "Chicken" && chickenCarbs.length != 0 ? (
                      <Row>
                        <span style={{ marginTop: "30px" }}>Chicken Carbs</span>
                        <Col>
                          <div style={{ marginTop: "30px" }}>
                            <div
                              style={{
                                paddingLeft: "20px",
                                paddingRight: "30px",
                                paddingTop: "8px",
                              }}
                              className="category"
                            >
                              {carbsList?.map((item) => item.mealName)}
                            </div>
                          </div>
                        </Col>
                        <Col>
                          <div style={{ marginTop: "30px" }}>
                            <SiAddthis onClick={HandleAddMeal2} color="red" />
                          </div>
                        </Col>
                      </Row>
                    ) : (
                      <div></div>
                    )}
                  </Col>
                  {/* <Col>
                    <Button onClick={() => getMeal(item)}>Show Menu</Button>
                  </Col> */}
                  <Col md="4">
                    <div onClick={() => setMenuButton(item)}>
                      <SiAddthis onClick={HandleAddMeal} color="red" />
                    </div>
                  </Col>

                  <Col>
                    <Row>Box Number</Row>
                    <Row>
                      <input
                        type="number"
                        style={{ width: "50px" }}
                        onChange={handleBoxNumber(item)}
                      />
                    </Row>
                  </Col>
                  {/* <Col className="Column2">
                    <div class="vl"></div>
                  </Col> */}
                </Row>
                {item == "Beef" ? (
                  <Row style={{ marginTop: "20px", marginLeft: "17px" }}>
                    {addOnList.map((data, index) => {
                      return (
                        <div key={data.id}>
                          <span
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "30px",
                              paddingTop: "8px",
                            }}
                            className="category"
                          >
                            {data.mealName == " " ? "Add On" : data.mealName}
                          </span>
                          <span
                            onClick={() => setAddOnId(data.id)}
                            style={{ marginLeft: "20px" }}
                          >
                            <SiAddthis onClick={HandleAddMeal1} color="red" />
                          </span>
                          <AiOutlineClose
                            color="red"
                            onClick={() => removeAddOnMenu(index)}
                            style={{ marginLeft: "20px" }}
                          />
                          <span
                            style={{
                              paddingLeft: "50px",
                              paddingRight: "50px",
                            }}
                          >
                            Box Number
                          </span>
                          <input
                            style={{ width: "50px", marginRight: "10px" }}
                            key={data.id}
                            value={data.inputValue}
                            onChange={handleBoxNumber1(data.id)}
                            type="number"
                          ></input>
                          {/* </div> */}
                        </div>
                      );
                    })}
                    <button
                      style={{
                        marginTop: "50px",
                        marginLeft: "400px",
                        width: "100px",
                        backgroundColor: "#ff702a",
                        color: "white",
                      }}
                      class="btn active"
                      onClick={() => AddNewFood()}
                    >
                      Add Food
                    </button>
                  </Row>
                ) : (
                  <div></div>
                )}
              </Col>
            );
          })
        ) : (
          <div>

          </div>
        )}
      </Row>
      {/* <Row>
        <Button
          style={{
            marginTop: "50px",
            marginLeft: "400px",
            width: "100px",
          }}
          class="btn active"
          onClick={() => AddNewFood()}
        >
          Add Food
        </Button>
      </Row> */}
      <Row className="calculateTotal">
        <Col style={{ marginLeft: "50px", marginTop: "50px" }}>
          <Row>Total Chicken: {sum.Chicken ? sum.Chicken : 0}</Row>
          <Row>Total Beef: {sum.Beef ? sum.Beef : 0} </Row>
          <Row>Total Breakfast: {sum.Breakfast ? sum.Breakfast : 0}</Row>
        </Col>
        <Col>
          <Row style={{ marginTop: "40px", width: "150px" }}>
            <Button onClick={calculateTotal}>Calculate Total</Button>
          </Row>
          <Row>
            <Button
              style={{ marginTop: "20px", width: "150px" }}
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Row>
        </Col>
      </Row>
      <br />
      <br />
      <br />

      <Row className="table">
        <Table>
          <tr>
            <th>Client ID</th>
            <th>Date</th>
            <th>Options </th>
            <th>Calories</th>
            <th>Proteins</th>
          </tr>
          {preRoundData.subs?.map(
            ({
              id,
              clientId,
              categories,
              date,
              targetCalories,
              targetProtien,
            }) => {
              return (
                <tbody style={{position: "relative", left: "120px"}}>
                  <tr>
                    <td>{clientId}</td>
                    <td>{moment.utc(date).format("YY/MM/DD")}</td>
                    {categories.map((item) => {
                      return (
                        <tr>
                          <td>{item.categoryName}</td>
                        </tr>
                      );
                    })}
                    <td>{targetCalories}</td>
                    <td>{targetProtien}</td>
                  </tr>
                </tbody>
              );
            }
          )}
        </Table>
      </Row>
      <RoundTypeModal
        carbs={addCarbMeal}
        setNewCarbMeal={HandleCarbMeal}
        closeModal={() => {
          setAddCarbMeal(false);
        }}
        addedMeal={addedMeal}
        setAddedMeal={setAddedMeal}
        menuButton={menuButton}
        setChicken={setChicken}
        setBeef={setBeef}
      />
      <AddOnTypeModal
        carbs1={addCarbMeal1}
        setNewCarbMeal1={HandleCarbMeal1}
        closeModal={() => {
          setAddCarbMeal1(false);
        }}
        addedMeal={addedMeal1}
        setAddedMeal={setAddedMeal1}
        addOnId={addOnId}
      />
      <CarbsTypeModal
        carbs2={addCarbMeal2}
        setNewCarbMeal2={HandleCarbMeal2}
        closeModal={() => {
          setAddCarbMeal2(false);
        }}
        addedMeal={addedMeal2}
        setAddedMeal={setAddedMeal2}
        addOnId={addOnId}
      />
            </div>
      ): (
        <div id="main">
          <div class="fof">
                <h1><i class="fa fa-times-circle"></i> No Record Found</h1>
          </div>
          </div>
      )}
      
    </div>
  );
};

export default PreCookingRound1;
