import React, { useState } from "react";
import CookingRoundTable from "../../components/CookingRoundTable.js/CookingRoundTable";
import { TableData } from "./CookingRoundTableData";
import { myarray } from "./CookRoundData2";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { apiData } from "./CookingRoundTableData";
import "./CookingRound.css";
const CookingRound = () => {
  console.log(myarray);
  const [startDate, setStartDate] = useState(TableData.startDate);
  const [endDate, setEndDate] = useState(TableData.endDate);
  const [roundId, setRoundId] = useState(TableData.roundId);
  const [portion, setPortion] = useState("110");
  return (
    <Row
      className={`max-width explore-section "explore-background" 
                }`}
    >
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
            "MealProtein",
            "MealCalories",
            "CurrentTotalCalories",
            "CurrentTotalProteins",
            "TargetCalories",
            "TargetProteins",
            "TargetFat",
            "CurrentTotalFat",
            "CurrentTotalCarb",
            "Actions",
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
    </Row>
  );
};

export default CookingRound;
