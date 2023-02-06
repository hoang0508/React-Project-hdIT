import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavDropdown } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate("/login");
  };
  const handleClickRegister = () => {
    navigate("/register");
  };

  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to="/" className="navbar-brand">
          Hỏi dân IT
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              Users
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <div className="btn-auth">
                <button
                  className="btn-login"
                  onClick={() => handleClickLogin()}
                >
                  Log in
                </button>
                <button
                  className="btn-signup"
                  onClick={() => handleClickRegister()}
                >
                  Sign up
                </button>
              </div>
            ) : (
              <>
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.2">
                    Log out
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Profile
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
