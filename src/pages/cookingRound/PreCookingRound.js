import React,{ useState, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { preRoundContext } from "../../Contexts/PreRound";
import axios from "axios";
import { Link } from "react-router-dom";
import "./frames2.css";
const PreCookingRound = () => {
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const {
    preRoundData,
    setPreRoundData,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useContext(preRoundContext);
  console.log("Pre Round Data", preRoundData);
  console.log("Start Date", startDate);
  console.log("End Date", endDate);
  const header = { "Content-Type": "application/json" };
  const getPreRoundData = async () => {
    await axios
      .post(
        `${BASEURL}/rounds/getprerounddata`,
        { startDate: startDate, endDate: endDate },
        header
      )
      .then((res) => {
        console.log("Data from Api", res.data);
        setPreRoundData(res.data);
      })
      .catch((err) => console.log(err.message));
   
  };
  console.log("Pre Round Data", preRoundData);

  return (
    <div className="CookingRound">
      <Col>
        <Row className="startDate">
          <span class="dateStyle">Enter Start Date</span>

          <input
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            style={{ width: "20%", marginLeft: "12px", height: "40px" }}
          />
        </Row>
        <Row className="endDate">
          <span class="dateStyle">Enter End Date</span>

          <input
            type="date"
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ width: "20%", marginLeft: "12px", height: "40px" }}
          />
        </Row>
      </Col>
      <Row className="submit">
        <div>
          <Link to="/precookinground1">
            <Button
              class="btn btn-info text-white  btn btn-primary"
              style={{
                width: "70px",
                height: "50px",
                fontSize: "15px",
                color: "white",
              }}
              onClick={() => getPreRoundData()}
            >
              Submit
            </Button>
          </Link>
        </div>
      </Row>
    </div>
  );
};

export default PreCookingRound;
