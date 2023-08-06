import React from 'react';
import { logout } from '../store';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  ButtonGroup,
  Card,
  Container,
  Button,
  Row,
  Col,
  Image,
  ButtonToolbar,
  Form,
} from 'react-bootstrap';
import CheckOut from '../Components/CheckOutModal';

import { updateQuantity } from '../store/cart';

const Cart = (props) => {
  const { cart } = props;
  const lineItems = cart.lineItems;

  async function handleRemove(cart, product, quantity) {
    await props.updateQuantity({ cart, product, quantity });
  }

  const handleQuantityChange = async (event, cart, product, oldQuantity) => {
    console.log('inside handleQuantityChange', event, oldQuantity);
    const newQuantity = Number(event.target.value);
    await props.updateQuantity({
      cart,
      product,
      quantity: newQuantity - oldQuantity,
    });
  };
  let subtotal = 0;
  lineItems.forEach((element) => {
    subtotal =
      subtotal + Number(element.quantity) * Number(element.product.price);
  });

  if (!lineItems) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="d-flex justify-content-center">
          <h1>Your cart total is ${subtotal.toFixed(2)}</h1>
        </div>
        {lineItems.map((item) => {
          return (
            <Card style={{ height: '12rem' }} key={item.product.id}>
              <Card.Body>
                <Container fluid>
                  <Row>
                    <Col sm={2}>
                      <Image
                        style={{ height: '5rem' }}
                        src={item.product.imageUrl1}
                        alt={item.product.name}
                        thumbnail
                      ></Image>
                    </Col>
                    <Col sm={7}>
                      <Card.Title>{item.product.name}</Card.Title>
                      <Card.Text>{item.product.description}</Card.Text>
                    </Col>
                    <Col xs={1}>
                      <Form.Group controlId="">
                        <Form.Control
                          as="select"
                          onChange={(e) =>
                            handleQuantityChange(
                              e,
                              cart,
                              item.product,
                              item.quantity
                            )
                          }
                        >
                          <option value={item.quantity}>{item.quantity}</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col sm={2}>
                      ${(item.quantity * item.product.price).toFixed(2)}
                      <ButtonToolbar aria-label="Toolbar with button groups">
                        <ButtonGroup className="me-2" aria-label="Second group">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                              handleRemove(cart, item.product, -item.quantity)
                            }
                          >
                            Remove
                          </Button>
                        </ButtonGroup>
                      </ButtonToolbar>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          );
        })}
        <Card style={{ height: '8rem' }}>
          <Card.Body>
            <Container fluid>
              <Row>
                <Col sm={2}></Col>
                <Col sm={7}>Subtotal</Col>
                <Col sm={1}></Col>
                <Col sm={2}>${subtotal.toFixed(2)}</Col>
              </Row>
              <Row>
                <Col sm={2}></Col>
                <Col sm={7}>Shipping</Col>
                <Col sm={1}></Col>
                <Col sm={2}>Free</Col>
              </Row>
              <Row>
                <Col sm={2}></Col>
                <Col sm={7}>Estimated tax for: 80439</Col>
                <Col sm={1}></Col>
                <Col sm={2}>$1.00</Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
        <Row>
          <Col sm={2}></Col>
          <Col sm={10}>
            <Card style={{ height: '8rem', border: 0 }}>
              <Card.Body>
                <Container fluid>
                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                      <Row>
                        <Col>
                          <h2>Total</h2>
                        </Col>
                        <Col>
                          <h2>${(subtotal + 1).toFixed(2)}</h2>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={1}></Col>
                  </Row>
                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col sm={4}>
                      <div className="d-grid gap-2">
                        <CheckOut />
                      </div>
                    </Col>
                    <Col sm={1}></Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

// define mapDispatchToProps
const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateQuantity: (item) => dispatch(updateQuantity(item, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
