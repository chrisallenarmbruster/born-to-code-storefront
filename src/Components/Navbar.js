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
import { useNavigate } from 'react-router-dom';

const NavBar = (props) => {
  const navigate = useNavigate();
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
                <>
                  <NavDropdown title="Account" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#/users/:id">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#/cart">Cart</NavDropdown.Item>
                    <NavDropdown.Item href={`#/users/${auth.id}/orders`}>
                      Orders
                    </NavDropdown.Item>
                    {auth.isAdmin ? (
                      <>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#/admin">
                          Admin Tools
                        </NavDropdown.Item>
                      </>
                    ) : null}
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logout(navigate)}>
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link href="#/login">Login</Nav.Link>
              )}
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
    logout: (navigate) => dispatch(logout(navigate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
