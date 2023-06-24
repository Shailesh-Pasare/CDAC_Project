import React from 'react';
import '../../css/dairyhomepage.css';
import { Container, Row, Col } from 'react-bootstrap';

const DairyManagementSystem = () => {
  return (
    <div className="dairy-management-system" >
      <Container>
        <Row>
          <Col>
            <h2>Dairy Management System</h2>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className="dairy-management-system__block">
              <h5>Individual Cow Tracking</h5>
              <p>The system can track individual cow health and milk production, allowing farmers to identify and address issues quickly.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="dairy-management-system__block">
              <h5>Dairy Products</h5>
              <p>This project can handle dairy products by providing inventory management features. The system enables Store to manage and track the quantity of dairy products.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="dairy-management-system__block">
              <h5>Supplier Management</h5>
              <p>Dairy Management System designed to help manage milk procurement and supplier records for small dairy farms.</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className="dairy-management-system__block">
              <h5>Milk Quality</h5>
              <p>The system can record and analyze data on milk quality and composition, helping Suppliers to maintain high standards of quality and safety.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="dairy-management-system__block">
              <h5>Store Management</h5>
              <p> The system enables Stores to track the quantity of products available in their store, set reorder levels, and generate purchase orders for new products</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="dairy-management-system__block">
              <h5>Reports</h5>
              <p>The system can generate reports on history of supplied milk and dairy products and their sales .</p>
            </div>
          </Col>
        </Row>
        <Row>

        </Row>
      </Container>
    </div>
  );
};

export default DairyManagementSystem;