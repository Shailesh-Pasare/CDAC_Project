import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '../../css/nav.css';
function Navigation({ activeTab, handleTabClick }) {
  return (

    <div>
      <Navbar bg="light" expand="lg">

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <h4>
              <Nav.Link
                as={Link}
                to="/"
                active={activeTab === 'home'}
                onClick={() => handleTabClick('home')}
              >
                Home
              </Nav.Link>
            </h4>
            <h4>
              <Nav.Link
                as={Link}
                to="/login"
                active={activeTab === 'login'}
                onClick={() => handleTabClick('login')}
              >
                Login
              </Nav.Link>
            </h4>
            <h4>
              <Nav.Link
                as={Link}
                to="/about"
                active={activeTab === 'about'}
                onClick={() => handleTabClick('about')}
              >
                About Us
              </Nav.Link>
            </h4>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    </div>
  );
}

export default Navigation;
