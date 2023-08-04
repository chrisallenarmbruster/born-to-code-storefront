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
} from 'react-bootstrap';

import { deleteFromCart } from '../store/cart';

const Cart = (props) => {
  const { cart } = props;
  console.log('my cart props', props);
  const lineItems = cart.lineItems;

  async function handleSubmit(product, quantitiyToRemove) {
    console.log('inside handle submit', product, quantitiyToRemove);
    await props.deleteFromCart({ product, quantitiyToRemove });
  }

  if (!lineItems) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {lineItems.map((item) => {
          return (
            <>
              <Card style={{ height: '15rem' }} key={item.product.id}>
                <Card.Body>
                  <Card.Title>{item.product.name}</Card.Title>
                  <Container>
                    <Row>
                      <Col>
                        <Image
                          style={{ height: '5rem' }}
                          src={item.product.imageUrl1}
                          alt={item.product.name}
                          thumbnail
                        ></Image>
                      </Col>
                      <Col>
                        <Card.Text>{item.product.description}</Card.Text>
                        <Card.Text>Price: {item.product.price}</Card.Text>
                        <Card.Text>Quantity: {item.quantity}</Card.Text>
                        <Card.Text>
                          SubTotal:{' '}
                          {(item.quantity * item.product.price).toFixed(2)}
                        </Card.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col></Col>
                      <Col>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                          <ButtonGroup aria-label="Basic example">
                            <Button variant="secondary" size="sm">
                              +
                            </Button>
                            <Button variant="secondary" size="sm">
                              -
                            </Button>
                          </ButtonGroup>
                          <ButtonGroup
                            className="me-2"
                            aria-label="Second group"
                          >
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleSubmit(item.product, 1)}
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
            </>
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
