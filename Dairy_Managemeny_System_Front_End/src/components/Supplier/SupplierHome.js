
import React, { useState } from "react";
import { Tab, Nav, Row, Col } from "react-bootstrap";
import "../../css/EmpHome.css";
import "../../css/ViewMilkSuppliers.css";
import "../../css/AddMilkSuppliers.css";
// import the components for each tab
//import AcceptMilk from "./AcceptMilk";
import TodayMilkRate from "../Bills/milkRate";
import History from '../../components/Bills/History';
import NewBill from '../../components/Bills/NewBill';



function SuppliersHome() {
    // state to keep track of which tab is currently active
    const [EmpTabClick, setEmpTabClick] = useState("milkrate");

    // function to handle tab click
    const handleEmpTabClick = (tab) => {
        if (tab === "logout") {
            const value = window.confirm("Are you sure to logout ?");
            if (value) {
                window.location.href = '/';
            } else {
                window.location.href = '/supplier';
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
                                    eventKey="milkrate"
                                    onClick={() => handleEmpTabClick("milkrate")}
                                >
                                    MilkRate
                                </Nav.Link>
                            </Nav.Item>
        
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="history"
                                    onClick={() => handleEmpTabClick("history")}
                                >
                                    Analyze hisotry
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
                            <Tab.Pane eventKey="milkrate">
                                <TodayMilkRate />
                            </Tab.Pane>


                            {/* <Tab.Pane eventKey="acceptMilk">
                                <NewBill />
                            </Tab.Pane> */}
                            <Tab.Pane eventKey="history">
                                <History />
                            </Tab.Pane>
                            <Tab.Pane eventKey="logout">
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}

export default SuppliersHome;
