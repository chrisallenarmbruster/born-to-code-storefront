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

import { deleteFromCart } from '../store/cart';
import { updateQuantity } from '../store/cart';

const Cart = (props) => {
  const { cart } = props;
  const lineItems = cart.lineItems;

  async function handleSubmit(cart, product, quantitiyToRemove) {
    await props.deleteFromCart({ cart, product, quantitiyToRemove });
  }

  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    dispatch(updateQuantity({ itemId, quantity: newQuantity }));
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
          <h1>Your bag total is ${subtotal.toFixed(2)}</h1>
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
                      <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                          as="select"
                          custom
                          onChange={handleQuantityChange}
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
                            onClick={() => handleSubmit(cart, item.product, 1)}
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
    deleteFromCart: (item) => dispatch(deleteFromCart(item, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
