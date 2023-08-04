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

const Cart = (props) => {
  const { cart } = props;
  console.log('my cart props', props);
  const lineItems = cart.lineItems;
  // use a ternary operator to check if the items have loaded before diplaying them on the page
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
                              onClick={() =>
                                cart.deleteFromCart(item.product.id)
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
            </>
          );
        })}
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return { cart: state.cart };
};

export default connect(mapStateToProps)(Cart);
