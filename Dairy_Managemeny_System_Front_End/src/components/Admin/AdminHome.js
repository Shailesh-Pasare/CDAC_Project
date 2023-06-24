import React, { useState } from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployeeForm';

const AdminHome = () => {
  const [activeEmployeeTab, setactiveEmployeeTab] = useState('employeeList');
  const [EmpTabClick, setEmpTabClick] = useState("viewMilkSuppliers");


  const handleTabClick = (tab) => {
    if (tab === "logout") {
      const value = window.confirm("Are you sure to logout ?");
      if (value) {
        window.location.href = '/';
      } else {
        window.location.href = '/employees';
      }
    }
  };



  return (
    <div>

      <Tab.Container activeKey={activeEmployeeTab} onSelect={setactiveEmployeeTab}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="employeeList">Employee List</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="addEmployee">Add Employee</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="logout"
                  onClick={() => handleTabClick("logout")}
                >
                  logout
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="employeeList">
                <EmployeeList />
              </Tab.Pane>
              <Tab.Pane eventKey="addEmployee">
                <AddEmployee />
              </Tab.Pane>

              <Tab.Pane eventKey="logout">
              </Tab.Pane>
            </Tab.Content>



          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default AdminHome;
