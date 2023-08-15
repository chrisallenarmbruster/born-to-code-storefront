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
import { useNavigate, useLocation } from 'react-router-dom';

import { updateQuantity, fetchCart } from '../store/cart';

import CheckOut from '../Components/CheckOutModal';

const Cart = (props) => {
  const { cart } = props;
  const lineItems = cart.lineItems;
  const navigate = useNavigate();

  async function handleRemove(cart, product, quantity) {
    await props.updateQuantity({ cart, product, quantity });
    if (props.auth.id === undefined) {
      const updatedItemList = cart.lineItems.filter(
        (item) => item.product.id !== product.id
      );
      const updatedCart = { ...cart, lineItems: updatedItemList };
      props.setState({ cart: updatedCart });
      console.log('updatedItemList', updatedItemList);
    } else {
      await props.fetchCart();
    }
  }

  const handleQuantityChange = async (event, cart, product, oldQuantity) => {
    // console.log('inside handleQuantityChange', event, oldQuantity);
    const newQuantity = Number(event.target.value);
    await props.updateQuantity({
      cart,
      product,
      quantity: newQuantity,
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
        <div className="my-5 d-flex justify-content-center">
          <h1>Your cart total is ${subtotal.toFixed(2)}</h1>
        </div>
        {lineItems.map((item, index) => {
          return (
            <Container  key={index}>
              <Card
                style={{ minHeight: '10rem', border: 0 }}
                key={item.product.id}
              >
                <Card.Body className="square border-top">
                  <Row>
                    <Col lg={2}>
                      <Image
                        style={{ height: '5rem', border: 0 }}
                        src={item.product.imageUrl1}
                        alt={item.product.name}
                        thumbnail={true}
                      ></Image>
                    </Col>
                    <Col lg={7}>
                      <Card.Title>{item.product.name}</Card.Title>
                      <Card.Text>{item.product.description}</Card.Text>
                    </Col>
                    <Col lg={1}>
                      <Form.Group controlId="exampleForm.SelectCustom">
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
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                          <option value={9}>9</option>
                          <option value={10}>10</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col lg={2}>
                      ${(item.quantity * item.product.price).toFixed(2)}
                      <ButtonToolbar aria-label="Toolbar with button groups">
                        <ButtonGroup className="me-2" aria-label="Second group">
                          <Button
                            variant="secondary"
                            size="sm"
                            aria-label="remove item button"
                            onClick={() => handleRemove(cart, item.product, 0)}
                          >
                            Remove
                          </Button>
                        </ButtonGroup>
                      </ButtonToolbar>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
          );
        })}
        <Container>
          <Card style={{ minHeight: '8rem', border: 0 }}>
            <Card.Body className="square border-top">
              <Row>
                <Col lg={2}></Col>
                <Col lg={7}>Subtotal</Col>
                <Col lg={1}></Col>
                <Col lg={2}>${subtotal.toFixed(2)}</Col>
              </Row>
              <Row>
                <Col lg={2}></Col>
                <Col lg={7}>Shipping</Col>
                <Col lg={1}></Col>
                <Col lg={2}>Free</Col>
              </Row>
              <Row>
                <Col lg={2}></Col>
                <Col lg={7}>Estimated tax for: 80439</Col>
                <Col lg={1}></Col>
                <Col lg={2}>$1.00</Col>
              </Row>
            </Card.Body>
          </Card>
          <Row>
            <Col lg={2}></Col>
            <Col lg={10}>
              <Card style={{ minHeight: '8rem', border: 0 }}>
                <Card.Body className="square border-top">
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
                    <Col lg={1}></Col>
                  </Row>
                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col lg={4}>
                      <div className="d-grid gap-2">
                        {props.auth.id ? (
                          <CheckOut amount={(subtotal + 1).toFixed(2)} />
                        ) : (
                          <button onClick={() => navigate('/login')}>
                            Login to Checkout
                          </button>
                        )}
                      </div>
                    </Col>
                    <Col lg={1}></Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    cart: state.cart,
  };
};

// define mapDispatchToProps
const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateQuantity: (item) => dispatch(updateQuantity(item, history)),
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
