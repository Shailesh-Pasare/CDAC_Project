import React, { useState } from "react";
import { Tab, Nav, Row, Col } from "react-bootstrap";
import "../../css/EmpHome.css";
import "../../css/ViewMilkSuppliers.css";
import "../../css/AddMilkSuppliers.css";
// import the components for each tab
import AddMilkSupplier from "../Supplier/AddMilkSupplier";
import ViewMilkSuppliers from "../Supplier/ViewMilkSuppliers";
//import AcceptMilk from "./AcceptMilk";
import MilkRate from "../Supplier/MilkRate";
import ProductList from "../Product/ProductList";
import Store from "../Store/Store";
import NewBill from "../Bills/NewBill";



function Home() {
  // state to keep track of which tab is currently active
  const [EmpTabClick, setEmpTabClick] = useState("viewMilkSuppliers");

  // function to handle tab click
  const handleEmpTabClick = (tab) => {
    if (tab === "logout") {
      const value = window.confirm("Are you sure to logout ?");
      if (value) {
        window.location.href = '/';
      } else {
        window.location.href = '/employeehome';
      }
    }
    setEmpTabClick(tab);
  };

  const handleEmpTabClick2 = (tab) => {
    if (tab === "logout") {
      const value = window.confirm("Are you sure to logout ?");
      if (value) {
        window.location.href = '/';
      } else {
        window.location.href = '/login';
      }
    }
    setEmpTabClick(tab);
  };

  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="home">

      {/* <Navigation activeTab={activeTab} handleTabClick={handleTabClick} /> */}


      <Tab.Container activeKey={EmpTabClick}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link
                  eventKey="viewMilkSuppliers"
                  onClick={() => handleEmpTabClick("viewMilkSuppliers")}
                >
                  View Milk Suppliers
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="addMilkSuppliers"
                  onClick={() => handleEmpTabClick("addMilkSuppliers")}
                >
                  Add Milk Suppliers
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="acceptMilk"
                  onClick={() => handleEmpTabClick2("acceptMilk")}
                >
                  Accept Milk
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="store"
                  onClick={() => handleEmpTabClick("store")}
                >
                  Store
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="productlist"
                  onClick={() => handleEmpTabClick("productlist")}
                >
                  Products
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="milkrate"
                  onClick={() => handleEmpTabClick("milkrate")}
                >
                  MilkRate
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="logout"
                  onClick={() => handleEmpTabClick("logout")}
                >
                  logout
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="addMilkSuppliers">
                <AddMilkSupplier />
              </Tab.Pane>
              <Tab.Pane eventKey="viewMilkSuppliers">
                <ViewMilkSuppliers />
              </Tab.Pane>
              {/* <Tab.Pane eventKey="acceptMilk">
                <AcceptMilk />
              </Tab.Pane> */}
              <Tab.Pane eventKey="store">
                <Store />
              </Tab.Pane>
              <Tab.Pane eventKey="productlist">
                <ProductList />
              </Tab.Pane>
              <Tab.Pane eventKey="milkrate">
                <MilkRate />
              </Tab.Pane>
              <Tab.Pane eventKey="logout">
              </Tab.Pane>
              <Tab.Pane eventKey="acceptMilk">
                <NewBill />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default Home;
