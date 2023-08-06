import { useState } from 'react';
import React from 'react';
import {
  ButtonGroup,
  Card,
  Container,
  Modal,
  Button,
  Row,
  Col,
  Image,
  ButtonToolbar,
  Form,
} from 'react-bootstrap';
import Payment from './Payment';

function CheckOut() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Checkout
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Where should we send your order?
          <Container>
            <Row>
              <Col sm={6}>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter first name" />
                  </Form.Group>
                </Form>
              </Col>
              <Col sm={6}>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter last name" />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="address" placeholder="Enter address" />
                  </Form.Group>
                </Form>
              </Col>
              <Col sm={6}>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="city" placeholder="Enter city" />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="State" placeholder="Enter state" />
                  </Form.Group>
                </Form>
              </Col>
              <Col sm={6}>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="Zip" placeholder="Enter zip code" />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="Phone"
                      placeholder="Enter phone number"
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Payment
          </Button>
          <Payment />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CheckOut;
