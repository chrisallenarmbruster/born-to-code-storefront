import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

//if auth id on state, logout button, otherwise login button
//search bar links to products page
//search equals to products

//Remove first products link from navbar, redundant now

const NavBar = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">Born to Code</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/home">Home</Nav.Link>
            <Nav.Link href="#/login">Login</Nav.Link>
            <Nav.Link href="#/cart">Cart</Nav.Link>
            <Nav.Link href="#/products">Products</Nav.Link>
            <Nav.Link href="#/users/:id">Profile</Nav.Link>
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="#/products?category=hats">Hats</NavDropdown.Item>
              <NavDropdown.Item href="#/products?category=mugs">Mugs</NavDropdown.Item>
              <NavDropdown.Item href="#/products?category=shirts">Shirts</NavDropdown.Item>
              <NavDropdown.Divider />          
              <NavDropdown.Item href="#/products">Products</NavDropdown.Item>        
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 d-inline"
              aria-label="Search"
            />
            <Button type="button" variant="outline-success">
              Search
            </Button>
          </Form>
          {/* Could put something here indicating the signed in user */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
