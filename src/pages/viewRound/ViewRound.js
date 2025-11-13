import React, { useState } from "react";
import CookingRoundTable from "../../components/CookingRoundTable.js/CookingRoundTable";
// import { TableData } from "./ViewRoundTableData";
import { TableData } from "../cookingRound/CookingRoundTableData";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { apiData } from "../cookingRound/CookingRoundTableData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import ViewRoundModal from '../../components/ViewRoundModal/ViewRoundModal';
import "./ViewRound.css";
const ViewRound = () => {
  const [startDate, setStartDate] = useState(TableData.startDate);
  const [endDate, setEndDate] = useState(TableData.endDate);
  const [roundId, setRoundId] = useState(TableData.roundId);
  const [portion, setPortion] = useState("110");
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState("");
  const [mealList, SetMealList] = useState([
    { id: 1, mealName: "chicken", planned: 2.4, actual: 2.2 },
    { id: 2, mealName: "onion", planned: 1, actual: 1 },
    { id: 3, mealName: "curry", planned: 0.5, actual: 1 },
  ]);
  const Navigate = useNavigate();
  const HandleUpdate = (id) => {
    console.log(id);
    setId(id);
    const url = `/editMealRound/edit/${id}`;
    console.log(url);
    Navigate(`/editMealRound/edit/${id}`);
  };

  console.log(mealList, "meallist");
  return (
    <Row
      className={`max-width explore-section "explore-background" 
                }`}
    >
      <Row>
        <Col md={2}></Col>
        <Col md={8} className="viewRound text-center p-1 mt-2">
          <h4 className="text-center text-danger font-weight-bold roundText mt-2">
            Round ID:{apiData.roundId}{" "}
          </h4>
          {apiData.mealSettings.map((value, key) => {
            return (
              <>
                <Link to="/editMealRound/edit/${}">
                  <Button
                    style={{ background: "rgb(183 87 183)" }}
                    className="mt-4 w-50 text-light"
                    variant="info"
                    onClick={() => HandleUpdate(value.mealId)}
                  >
                    {value.categoryName}
                  </Button>
                </Link>
                <br />
              </>
            );
          })}
          {/* <Button
            style={{ background: "rgb(183 87 183)" }}
            className="mt-4 w-50 text-light"
            variant="info"
            onClick={() => setOpen(true)}
          >
            Chicken Masalah
          </Button>
          <br />
          <Button
            variant="outline-light"
            className="mt-4 w-50 "
            onClick={() => setOpen(true)}
          >
            Rice
          </Button>
          <br />
          <Button
            style={{ background: "rgb(192 0 255)" }}
            className="mt-4 w-50 "
            onClick={() => setOpen(true)}
          >
            Beef Masalah
          </Button> */}
        </Col>
        <Col md={2}></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col sm="8">
          <h4 className="text-center text-danger font-weight-bold meal-heading mt-2">
            Round ID:{roundId} &nbsp; StartDate:{startDate}&nbsp; EndDate:
            {endDate}{" "}
          </h4>
        </Col>
        <Col></Col>
      </Row>
      <Col sm="1"></Col>
      <Col sm="10">
        {" "}
        <CookingRoundTable
          apiData={apiData}
          TableData={TableData}
          portion={portion}
          setPortion={setPortion}
          TableMaplist={[
            "ClientID",
            "Date",
            "MealCategory",
            "MealName",
            "MinPortion",
            "MaxPortion",
            "Portion",
            "MealCalories",
            "CurrentTotalCalories",
            "CurrentTotalProteins",
            "TargetCalories",
            "TargetProteins",
          ]}
        />
      </Col>
      <Col sm="1"></Col>
      <Row>
        <Col sm="2"></Col>
        <Col sm="8">
          <Button className="w-100" variant="success">
            Submit
          </Button>
        </Col>
        <Col sm="2"></Col>
      </Row>
      {/* <ViewRoundModal
        open={open}
        closeModal={() => {
          setOpen(false);
        }}
        mealList={mealList}
        SetMealList={SetMealList}
      /> */}
    </Row>
  );
};

export default ViewRound;
