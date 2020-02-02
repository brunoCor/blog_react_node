import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Logo from "../images/logo.JPG";
import "./Header.css";

const backgroundStyle = {
  // 'backgroundImage': 'linear-gradient(to right, #e6ef97, #b5c62c)'
  backgroundColor: "white"
};

class Header extends Component {
  render() {
    return (
      <Navbar expand="lg" variant="light">
      <div className="container">
      <Navbar.Brand as={Link} to="/">
            <img className="img-fluid rounded" alt="logo" src={Logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Acceuil
              </Nav.Link>
              <Nav.Link as={Link} to="/contact-us">
                Contactez-nous
              </Nav.Link>
              <Nav.Link as={Link} to="/blog">
                Blog
              </Nav.Link>
              {this.props.auth && (
                <NavDropdown title="Admin" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/admin/messages">
                    Gestion des messages
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/addBlogpost">
                    Ajouter un article au blog
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            <Nav>
              {this.props.auth === false && (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
              {this.props.auth && (
                <Nav.Link href="/api/logout">Logout</Nav.Link>
              )}
              {/* nothing is displayed while this.props.auth === null : we dont know */}
            </Nav>
          </Navbar.Collapse>
      </div>
          
      </Navbar>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth }; // same as (state) { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
