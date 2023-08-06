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
  CloseButton,
} from 'react-bootstrap';
import MyPaymentForm from './Payment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateQuantity, fetchCart } from '../store/cart';
import {
  GooglePay,
  GooglePayProps,
  ApplePay,
  ApplePayProps,
  PaymentForm,
} from 'react-square-web-payments-sdk';
function CheckOut(props) {
  const { cart } = props;
  const lineItems = cart.lineItems;
  console.log('inside checkout', lineItems);
  console.log('inside checkout', props);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let subtotal = 0;
  lineItems.forEach((element) => {
    subtotal =
      subtotal + Number(element.quantity) * Number(element.product.price);
  });

  async function handleRemove(cart, product, quantity) {
    await props.updateQuantity({ cart, product, quantity });
  }

  return (
    <PaymentForm
      /**
       * Identifies the calling form with a verified application ID generated from
       * the Square Application Dashboard.
       */
      applicationId="sandbox-sq0idb-9aiQYyJJerVQ_xS_gMVOmA"
      /**
       * Invoked when payment form receives the result of a tokenize generation
       * request. The result will be a valid credit card or wallet token, or an error.
       */
      cardTokenizeResponseReceived={(token, buyer) => {
        console.info({ token, buyer });
      }}
      /**
       * This function enable the Strong Customer Authentication (SCA) flow
       *
       * We strongly recommend use this function to verify the buyer and reduce
       * the chance of fraudulent transactions.
       */
      createVerificationDetails={() => ({
        amount: '1.00',
        /* collected from the buyer */
        billingContact: {
          addressLines: ['123 Main Street', 'Apartment 1'],
          familyName: 'Doe',
          givenName: 'John',
          countryCode: 'GB',
          city: 'London',
        },
        currencyCode: 'GBP',
        intent: 'CHARGE',
      })}
      createPaymentRequest={() => ({
        countryCode: 'US',
        currencyCode: 'USD',
        lineItems: [
          {
            amount: '22.15',
            label: 'Item to be purchased',
            id: 'SKU-12345',
            imageUrl: 'https://url-cdn.com/123ABC',
            pending: true,
            productUrl: 'https://my-company.com/product-123ABC',
          },
        ],
        taxLineItems: [
          {
            label: 'State Tax',
            amount: '8.95',
            pending: true,
          },
        ],
        discounts: [
          {
            label: 'Holiday Discount',
            amount: '5.00',
            pending: true,
          },
        ],
        requestBillingContact: false,
        requestShippingContact: false,
        shippingOptions: [
          {
            label: 'Next Day',
            amount: '15.69',
            id: '1',
          },
          {
            label: 'Three Day',
            amount: '2.00',
            id: '2',
          },
        ],
        // pending is only required if it's true.
        total: {
          amount: '41.79',
          label: 'Total',
        },
      })}
      /**
       * Identifies the location of the merchant that is taking the payment.
       * Obtained from the Square Application Dashboard - Locations tab.
       */
      locationId="LFJJJ47TKFPE2"
    >
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
                    <Card.Body
                      border={0}
                      className="square border-bottom"
                      aria-label="Form"
                    >
                      <Row>
                        <Col sm={6}>
                          <Card.Text
                            style={{ fontSize: 12 }}
                            aria-label="Product"
                          >
                            {item.product.name}
                          </Card.Text>
                        </Col>
                        <Col sm={2}>
                          <Card.Text
                            style={{ fontSize: 12 }}
                            aria-label="Quantity"
                          >
                            Quantity: {item.quantity}
                          </Card.Text>
                        </Col>
                        <Col sm={2}>
                          <Card.Text
                            style={{ fontSize: 12 }}
                            aria-label="Price"
                          >
                            Price: ${item.product.price}
                          </Card.Text>
                        </Col>
                        <Col sm={2}>
                          <CloseButton
                            aria-label="Remove"
                            onClick={() =>
                              handleRemove(cart, item.product, -item.quantity)
                            }
                          ></CloseButton>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                );
              })}
              <Card style={{ height: '8rem', border: 0 }}>
                <Card.Body className="square border-top">
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
                </Card.Body>
              </Card>
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
                          <Form.Control
                            type="State"
                            placeholder="Enter state"
                          />
                        </Form.Group>
                      </Form>
                    </Col>
                    <Col sm={6}>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Zip Code</Form.Label>
                          <Form.Control
                            type="Zip"
                            placeholder="Enter zip code"
                          />
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
                  <Row>
                    <MyPaymentForm />
                  </Row>
                </Card.Body>
              </Card>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            {/* <ApplePay ApplePayProps={ApplePayProps} /> */}
            {/* 
            <Row>
              <GooglePay GooglePayProps={GooglePayProps} />
            </Row> */}
          </Modal.Footer>
        </Modal>
      </>
    </PaymentForm>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateQuantity: (item) => dispatch(updateQuantity(item, history)),
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
