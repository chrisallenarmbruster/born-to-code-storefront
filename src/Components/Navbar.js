import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Born to Code</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/">Home</Nav.Link>
            <Nav.Link href="#/cart">Cart</Nav.Link>
            <Nav.Link href="#/products">Products</Nav.Link>
            <Nav.Link href="#/users/:id">Profile</Nav.Link>
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.item href="#/products/hats">Hats</NavDropdown.item>
              <NavDropdown.item href="#/products/mugs">Mugs</NavDropdown.item>
              <NavDropdown.item href="#/products/shirts">Shirts</NavDropdown.item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="">
                All products
                {/* I feel that having a page for each category, and then an all products page makes sense */}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button variant="outline-success">Search</Button>
          </Form>
          {/* Could put something here indicating the signed in user */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default NavBar;
