import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { toastmessage } from "../../../../components/ToastMessage/toast";
import "./SubscriptionForm.css";
import Table from "react-bootstrap/Table";
import { IoIosAdd } from "react-icons/io"
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import { AddClients, UpdateClient } from "../../../../utils/Apis";
import { TiDeleteOutline } from "react-icons/ti"
import MealModalType1 from "../../../../components/MealTypeModal/MealModalType1";
import SubscriptionMondayMealModal from "../../../../components/SubscriptionMealModal/SubscriptionMondayMealModal";
import SubscriptionTuesdayMealModal from "../../../../components/SubscriptionMealModal/SubscriptionTuesdayMealModal";
import SubscriptionWednesdayMealModal from "../../../../components/SubscriptionMealModal/SubscriptionWednesdayMealModal";
import SubscriptionThursdayMealModal from "../../../../components/SubscriptionMealModal/SubscriptionThursdayMealModal";
import SubscriptionFridayMealModal from "../../../../components/SubscriptionMealModal/SubscriptionFridayMealModal";
import SubscriptionSaturdayMealModal from "../../../../components/SubscriptionMealModal/SubscriptionSaturdayMealModal";
import SubscriptionSundayMealModal from "../../../../components/SubscriptionMealModal/SubscriptionSundayMealModal";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

function SubscriptionForm(props) {
  const [clientId, setClientId] = useState();
  const [subscriptionDays, setSubscriptionDays] = useState("");
  const [TargetProteins, setTargetProteins] = useState("");
  const [TargetCalories, setTargetCalories] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [skipDates, setSkipDates] = useState(new Date())
  const [dates, setDates] = useState([
    new Date("yyyy-MM-dd")])
  const [monday, setMonday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wednesday, setWednesday] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSaturday] = useState([]);
  const [sunday, setSunday] = useState([]);


  // True false condition for meal popup open
  const [mondayMeal, setMondayMeal] = useState(false);
  const [tuesdayMeal, setTuesdayMeal] = useState(false);
  const [WednesdayMeal, setWednesdayMeal] = useState(false);
  const [ThursdayMeal, setThursdayMeal] = useState(false);
  const [FridayMeal, setFridayMeal] = useState(false);
  const [SaturdayMeal, setSaturdayMeal] = useState(false);
  const [SundayMeal, setSundayMeal] = useState(false);



  //Total Chickens
  const [totalChicken, setTotalChicken] = useState();
  const [totalBeef, setTotalBeef] = useState();
  const [totalBreakFast, setTotalbreakFast] = useState();

  const AllChickens = () => {
    const allChickens = [...monday, ...tuesday, ...wednesday, ...thursday, ...friday, ...saturday, ...sunday];
    console.log(allChickens)
    const chickenadd = allChickens.filter((chciken) => {
      return chciken.name === "Chicken"
    }).map(chicken => { return chicken.count }).reduce(getSum, 0)
    console.log(chickenadd)
    function getSum(total, num) {
      return total + Math.round(num);
    }
    console.log(chickenadd)
    setTotalChicken(chickenadd)

  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
  };

  const HandleAddMeal = (MealDay) => {
    if (MealDay === "Monday")
      setMondayMeal(true)
    else if (MealDay === "Tuesday")
      setTuesdayMeal(true)
    else if (MealDay === "Wednesday")
      setWednesdayMeal(true)
    else if (MealDay === "Thursday")
      setThursdayMeal(true)
    else if (MealDay === "Friday")
      setFridayMeal(true)
    else if (MealDay === "Saturday")
      setSaturdayMeal(true)
    else if (MealDay === "Sunday")
      setSundayMeal(true)
  };


  const RemoveMeal = (MealDay, mealName) => {
    if (MealDay === "Monday") {
      const mondayMeal = [...monday];
      const filtermeal = mondayMeal.filter(meal => meal.name !== mealName);
      setMonday(filtermeal)
    } else if (MealDay === "Tuesday") {
      const tuesdayMeal = [...tuesday];
      const filtermeal = tuesdayMeal.filter(meal => meal.name !== mealName);
      setTuesday(filtermeal)
    } else if (MealDay === "Wednesday") {
      const WednesdayMeal = [...wednesday];
      const filtermeal = WednesdayMeal.filter(meal => meal.name !== mealName);
      setWednesday(filtermeal)
    } else if (MealDay === "Thursday") {
      const ThursdayMeal = [...thursday];
      const filtermeal = ThursdayMeal.filter(meal => meal.name !== mealName);
      setThursday(filtermeal)
    } else if (MealDay === "Friday") {
      const FridayMeal = [...friday];
      const filtermeal = FridayMeal.filter(meal => meal.name !== mealName);
      setFriday(filtermeal)
    } else if (MealDay === "Saturday") {
      const SaturdayMeal = [...saturday];
      const filtermeal = SaturdayMeal.filter(meal => meal.name !== mealName);
      setSaturday(filtermeal)
    } else if (MealDay === "Sunday") {
      const SundayMeal = [...sunday];
      const filtermeal = SundayMeal.filter(meal => meal.name !== mealName);
      setSunday(filtermeal)
    }
  }


  const HandleAddTuesdayMeal = () => {
    setTuesdayMeal(true)
  };


  return (
    <Row className="max-width explore-section">
      <Col>
        <Row className="well m-4">
          <h2 className="rounded w-100 ml-3">
            Subscription Form
          </h2>

          <Col md={6}>
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
                <Form.Group as={Col} controlId="formGridMealName">

                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridMealName">
                  <Form.Label>Start Date</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="yyyy-MM-dd"
                    showTimeInput
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridMealName">
                  <Form.Label>Numbers of Subscription days</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Subscription Days"
                    value={subscriptionDays}
                    onChange={(e) => {
                      setSubscriptionDays(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridMealName">
                  <Form.Label>Target Proteins</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Target Proteins"
                    value={TargetProteins}
                    onChange={(e) => {
                      setTargetProteins(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridMealName">
                  <Form.Label>Target Calories</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Target Calories"
                    value={TargetCalories}
                    onChange={(e) => {
                      setTargetCalories(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Skip Date List</Form.Label>
                  <DatePicker
                    value={dates}
                    onChange={setDates}
                    format="YYYY MMMM DD"
                    sort
                    plugins={[
                      <DatePanel />
                    ]}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Last Subscription Date</Form.Label>

                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="yyyy-MM-dd"
                    showTimeInput

                  />

                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                </Form.Group>
              </Row>
              <Row className="mb-3 mt-4">
                <Col className="totalMeal" md={6}>

                  <h3>Total Meals</h3>
                  <p>chicken:{totalChicken}</p>
                  <p>beef:{totalBeef}</p>
                  <p>breakfast:{totalBreakFast}</p>
                </Col>
                <Col md={6}></Col>


              </Row>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={3}>
            <Row>
              <Col>
                {subscriptionDays > 0 &&
                  <p>{days[0]}
                    {monday.length === 0 && <span><IoIosAdd color="red" size={20} onClick={() => HandleAddMeal("Monday")} /></span>}
                  </p>
                }
                {monday.map !== undefined && monday.map((meal, index) => {
                  return <Row key={index}>
                    <Col className="MealCount">{meal.count}</Col>
                    <Col> {meal.name}</Col>
                    <Col><TiDeleteOutline color="red" size={20} onClick={() => { RemoveMeal("Monday", meal.name) }} /></Col>
                    <Col md={8}></Col>
                  </Row>
                })}
              </Col>
            </Row>
            <Row>
              <Col>

                {subscriptionDays > 1 &&
                  <p>{days[1]}
                    {tuesday.length === 0 && <span><IoIosAdd color="red" size={20} onClick={() => HandleAddMeal("Tuesday")} /></span>}
                  </p>
                }
                {tuesday.map !== undefined && tuesday.map((meal, index) => {
                  return <Row key={index}>
                    <Col className="MealCount">{meal.count}</Col>
                    <Col> {meal.name}</Col>
                    <Col><TiDeleteOutline color="red" size={20} onClick={() => { RemoveMeal("Tuesday", meal.name) }} /></Col>
                    <Col md={8}></Col>
                  </Row>
                })}
              </Col>
            </Row>
            <Row>
              <Col>

                {subscriptionDays > 2 &&
                  <p>{days[2]}
                    {wednesday.length === 0 && <span><IoIosAdd color="red" size={20} onClick={() => HandleAddMeal("Wednesday")} /></span>}
                  </p>
                }
                {wednesday.map !== undefined && wednesday.map((meal, index) => {
                  return <Row key={index}>
                    <Col className="MealCount">{meal.count}</Col>
                    <Col> {meal.name}</Col>
                    <Col><TiDeleteOutline color="red" size={20} onClick={() => { RemoveMeal("Wednesday", meal.name) }} /></Col>
                    <Col md={8}></Col>
                  </Row>
                })}
              </Col>
            </Row>
            <Row>
              <Col>
                {subscriptionDays > 3 &&
                  <p>{days[3]}
                    {thursday.length === 0 && <span><IoIosAdd color="red" size={20} onClick={() => HandleAddMeal("Thursday")} /></span>}
                  </p>
                }
                {thursday.map !== undefined && thursday.map((meal, index) => {
                  return <Row key={index}>
                    <Col className="MealCount">{meal.count}</Col>
                    <Col> {meal.name}</Col>
                    <Col><TiDeleteOutline color="red" size={20} onClick={() => { RemoveMeal("Thursday", meal.name) }} /></Col>
                    <Col md={8}></Col>
                  </Row>
                })}
              </Col>
            </Row>
          </Col>
          <Col md={3}>
            <Row>

              <Col>
                {subscriptionDays > 4 &&
                  <p>{days[4]}
                    {friday.length === 0 && <span><IoIosAdd color="red" size={20} onClick={() => HandleAddMeal("Friday")} /></span>}
                  </p>
                }
                {friday.map !== undefined && friday.map((meal, index) => {
                  return <Row key={index}>
                    <Col className="MealCount">{meal.count}</Col>
                    <Col> {meal.name}</Col>
                    <Col><TiDeleteOutline color="red" size={20} onClick={() => { RemoveMeal("Friday", meal.name) }} /></Col>
                    <Col md={8}></Col>
                  </Row>
                })}
              </Col>
            </Row>
            <Row>
              <Col>

                {subscriptionDays > 5 &&
                  <p>{days[5]}
                    {saturday.length === 0 && <span><IoIosAdd color="red" size={20} onClick={() => HandleAddMeal("Saturday")} /></span>}
                  </p>
                }
                {saturday.map !== undefined && saturday.map((meal, index) => {
                  return <Row key={index}>
                    <Col className="MealCount">{meal.count}</Col>
                    <Col> {meal.name}</Col>
                    <Col><TiDeleteOutline color="red" size={20} onClick={() => { RemoveMeal("Saturday", meal.name) }} /></Col>
                    <Col md={8}></Col>
                  </Row>
                })}
              </Col>
            </Row>
            <Row>
              <Col>

                {subscriptionDays > 6 &&
                  <p>{days[6]}
                    {sunday.length === 0 && <span><IoIosAdd color="red" size={20} onClick={() => HandleAddMeal("Sunday")} /></span>}
                  </p>
                }
                {sunday.map !== undefined && sunday.map((meal, index) => {
                  return <Row key={index}>
                    <Col className="MealCount">{meal.count}</Col>
                    <Col> {meal.name}</Col>
                    <Col><TiDeleteOutline color="red" size={20} onClick={() => { RemoveMeal("Sunday", meal.name) }} /></Col>
                    <Col md={8}></Col>
                  </Row>
                })}
              </Col>
            </Row>
            <Button onClick={() => { AllChickens() }}>All Chickens</Button>
          </Col>
        </Row>
      </Col>
      {/* Monday Meal */}
      <SubscriptionMondayMealModal
        setMonday={setMonday}
        mondayMeal={mondayMeal}
        closeModal={() => {
          setMondayMeal(false)
        }}
      />
      {/* Tuesday Meal */}
      <SubscriptionTuesdayMealModal
        setTuesday={setTuesday}
        tuesdayMeal={tuesdayMeal}
        closeModal={() => {
          setTuesdayMeal(false)
        }}
      />

      {/* Wednesday Meal */}
      <SubscriptionWednesdayMealModal
        setWednesday={setWednesday}
        WednesdayMeal={WednesdayMeal}
        closeModal={() => {
          setWednesdayMeal(false)
        }}
      />
      {/* Thursday Meal */}
      <SubscriptionThursdayMealModal
        setThursday={setThursday}
        ThursdayMeal={ThursdayMeal}
        closeModal={() => {
          setThursdayMeal(false)
        }}
      />

      {/* Friday Meal */}
      <SubscriptionFridayMealModal
        setFriday={setFriday}
        FridayMeal={FridayMeal}
        closeModal={() => {
          setFridayMeal(false)
        }}
      />
      {/* Saturday Meal */}
      <SubscriptionSaturdayMealModal
        setSaturday={setSaturday}
        SaturdayMeal={SaturdayMeal}
        closeModal={() => {
          setSaturdayMeal(false)
        }}
      />

      {/* Sunday Meal */}
      <SubscriptionSundayMealModal
        setSunday={setSunday}
        SundayMeal={SundayMeal}
        closeModal={() => {
          setSundayMeal(false)
        }}
      />

    </Row>
  );
}

export default SubscriptionForm;
