import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Search from './Search';
import { connect } from 'react-redux';
import { logout } from '../store';
import CartIndicator from './CartIndicator';

const NavBar = (props) => {
  const { auth } = props;
  const { logout } = props;

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">Born to Code</Navbar.Brand>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#/home">Home</Nav.Link>
              <NavDropdown title="Products" id="basic-nav-dropdown">
                <NavDropdown.Item href="#/products?category=hats">
                  Hats
                </NavDropdown.Item>
                <NavDropdown.Item href="#/products?category=mugs">
                  Mugs
                </NavDropdown.Item>
                <NavDropdown.Item href="#/products?category=shirts">
                  Shirts
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#/products">
                  All Products
                </NavDropdown.Item>
              </NavDropdown>

              {auth.id ? (
                <Nav.Link href="#" onClick={logout}>
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link href="#/login">Login</Nav.Link>
              )}

              {auth.id && <Nav.Link href="#/users/:id">Profile</Nav.Link>}

              {auth.isAdmin && <Nav.Link href="#/admin">Admin</Nav.Link>}
            </Nav>
            <Search />
          </Navbar.Collapse>
          <CartIndicator />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
    </>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
