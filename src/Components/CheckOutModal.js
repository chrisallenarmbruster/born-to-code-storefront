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
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function CheckOut(props) {
  const { cart } = props;
  const lineItems = cart.lineItems;
  console.log('inside checkout', lineItems);
  console.log('inside checkout', props);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleRemove(cart, product, quantity) {
    await props.updateQuantity({ cart, product, quantity });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Checkout
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        scrollable={true}
        animation={true}
        contentClassName="modal-height"
      >
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>Your Cart:</Row>
            {lineItems.map((item) => {
              return (
                <Card
                  style={{ height: '3rem', border: 0 }}
                  key={item.product.id}
                >
                  <Card.Body border={0} className="square border-bottom">
                    <Row>
                      <Col sm={6}>
                        <Card.Text style={{ fontSize: 12 }}>
                          {item.product.name}
                        </Card.Text>
                      </Col>
                      <Col sm={2}>
                        <Card.Text style={{ fontSize: 12 }}>
                          Quantity: {item.quantity}
                        </Card.Text>
                      </Col>
                      <Col sm={2}>
                        <Card.Text style={{ fontSize: 12 }}>
                          Price: ${item.product.price}
                        </Card.Text>
                      </Col>
                      <Col sm={2}>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            handleRemove(cart, item.product, item.quantity)
                          }
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              );
            })}
            <Card style={{ height: '3rem', border: 0 }}>
              <Card.Body border={0} className="square border-bottom">
                <Row>Where should we send your order?</Row>
                <Row>
                  <Col sm={6}>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="name"
                          placeholder="Enter first name"
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col sm={6}>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="name"
                          placeholder="Enter last name"
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="address"
                          placeholder="Enter address"
                        />
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
              </Card.Body>
            </Card>
            {/* <Card style={{ height: '3rem', border: 0 }}>
            <Card.Body border={0} className="square border-bottom">
              <Payment />
            </Card.Body>
          </Card> */}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Payment />
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(CheckOut);
