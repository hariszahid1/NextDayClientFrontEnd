import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "./Navbar.css";
function NavBar() {
  return (
    <Row>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/" className="link">
            <Navbar.Brand>Kitchen Prep</Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <Link to="meal" className="link m-1">
              <span>Meal</span>
            </Link>
            <Link to="clients" className="link m-1">
              <span>Client</span>
            </Link>
            <Link to="subscription" className="link m-1">
              <span>Subscription</span>
            </Link>
            <Link to="precookinground" className="link m-1">
              <span>Pre-Cooking Round</span>
            </Link>
            <Link to="cookingRound" className="link m-1">
              <span>Cooking Round</span>
            </Link>
            <Link to="viewRound" className="link m-1">
              <span>View Round</span>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </Row>
  );
}

export default NavBar;
