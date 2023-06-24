import { useState, useEffect } from "react";
import axios from "axios";
import "../../css/milkRate.css";

import { Container, Row, Col } from "react-bootstrap";
const MilkRate = () => {
  const [milkRates, setMilkRates] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7071/milkrates/milk-rates")
      .then((response) => {
        setMilkRates(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="milk-rates-container">
      <h1 className="milk-rates-heading"> Today's Milk Rates: </h1>
      <h2 className="milk-rates-heading-second"> <marquee ><i>🐮  Make more out of it   🐃</i> </marquee> </h2>

      <div className="milk-rates-list">
        {milkRates.map((milkRate) => (
          <Container key={milkRate.id} fluid className="milk-rate-card">
            {/* <Row className="milk-rate-row">
              <Col className="milk-rate-label">Generated Id:</Col>
              <Col className="milk-rate-value">{milkRate.id}</Col>
            </Row> */}
            <Row className="milk-rate-row">
              <Col className="milk-rate-label"> Todays Date: </Col>
              <Col className="milk-rate-value">{milkRate.dateOfMilkRate}</Col>
            </Row>
            <Row className="milk-rate-row">
              <Col className="milk-rate-label">Cow Fat:</Col>
              <Col className="milk-rate-value">{milkRate.cowFat}</Col>
            </Row>
            <Row className="milk-rate-row">
              <Col className="milk-rate-label">Buffalo Fat:</Col>
              <Col className="milk-rate-value">{milkRate.buffaloFat}</Col>
            </Row>
            <Row className="milk-rate-row">
              <Col className="milk-rate-label">Cow Milk Rate:</Col>
              <Col className="milk-rate-value">{milkRate.cowMilkRate}</Col>
            </Row>
            <Row className="milk-rate-row">
              <Col className="milk-rate-label">Buffalo Milk Rate:</Col>
              <Col className="milk-rate-value">{milkRate.buffaloMilkRate}</Col>
            </Row>
          </Container>
        ))}

      </div>
    </div>
  );
};

export default MilkRate;
