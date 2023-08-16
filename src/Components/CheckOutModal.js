import React, { Component } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { emailClient } from '../emailClient';
import { withRouter } from '../utils/withRouter';
export class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      phone: '',
      show: false,
      validationErrors: {},
      transactionComplete: false,
    };
    console.log('props ', props);

    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.subTotal = this.subTotal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.shouldShowPaymentForm = this.shouldShowPaymentForm.bind(this);
    this.handleCompleteTransaction = this.handleCompleteTransaction.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.id) {
      let authObject = this.props.auth;
      Object.keys(authObject).forEach((key) => {
        if (authObject[key] === null) authObject[key] = '';
      });

      this.setState({
        first: authObject.firstName,
        last: authObject.lastName,
        address: authObject.address,
        city: authObject.city,
        state: authObject.state,
        zip: authObject.zip,
        email: authObject.email,
        phone: authObject.phone,
      });
    }
  }

  validateField(name, value) {
    let error;
    switch (name) {
      case 'first':
        error = value.trim() === '' ? 'This field is required' : null;
        break;
      case 'last':
        error = value.trim() === '' ? 'This field is required' : null;
        break;
      case 'city':
        error = value.trim() === '' ? 'This field is required' : null;
        break;
      case 'state':
        error = value.trim() === '' ? 'This field is required' : null;
        break;
      case 'address':
        error = value.trim() === '' ? 'Address is required' : null;
        break;
      case 'zip':
        error = !/^\d{5}$/.test(value) ? 'Enter a valid ZIP code' : null;
        break;
      case 'phone':
        error = !/^\d{10}$/.test(value) ? 'Enter a valid phone number' : null;
        break;
      case 'email':
        error = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
          ? 'Enter a valid email address'
          : null;
        break;
      default:
        break;
    }
    return error;
  }

  handleChange = async (event) => {
    const { name, value } = event.target;
    const error = this.validateField(name, value);
    this.setState(
      (prevState) => ({
        ...prevState,
        [name]: value,
        validationErrors: { ...prevState.validationErrors, [name]: error },
      }),
      () => {
        console.log('State has been updated!', this.state);
      }
    );
  };

  //NOTE: How do I get this to route back to the products page after the transaction is complete?
  handleCompleteTransaction = (lineItems, paymentId) => {
    this.setState({ transactionComplete: true });
    emailClient(this.state.email, paymentId, lineItems);
    this.props.router.navigate('/thankyou');
  };

  handleClose() {
    this.setState({
      show: false,
    });
  }

  handleShow() {
    this.setState({
      show: true,
    });
  }

  subTotal(lineItems) {
    let subtotal = 0;
    lineItems.forEach((element) => {
      console.log(element);
      console.log(subtotal);
      subtotal =
        subtotal + Number(element.quantity) * Number(element.product.price);
    });
    console.log('subtotal ', subtotal);
    return subtotal;
  }

  handleRemove(cart, product, quantity) {
    this.props.updateQuantity({ cart, product, quantity });
  }

  handleAddOrder(cart, order) {
    this.props.addOrders({ cart, order });
  }

  shouldShowPaymentForm() {
    const {
      validationErrors,
      first,
      last,
      address,
      city,
      state,
      zip,
      email,
      phone,
    } = this.state;

    // Check if any validation error exists
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== null
    );

    const hasEmptyFields = [
      first,
      last,
      address,
      city,
      state,
      zip,
      email,
      phone,
    ].some((field) => !field.trim());

    return !hasErrors && !hasEmptyFields;
  }
  render() {
    const { cart } = this.props;
    const lineItems = cart.lineItems;
    const amount = this.subTotal(lineItems).toFixed(2);
    let tax = 8;
    const total = (amount * 1.08).toFixed(2);
    console.log('amount ', amount);
    const zip = this.state.zip;
    return (
      <>
        {!this.state.transactionComplete && (
          <>
            <Button variant="primary" onClick={this.handleShow}>
              Checkout
            </Button>

            <Modal
              show={this.state.show}
              onHide={this.handleClose}
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
                        style={{ minHeight: '3rem', border: 0 }}
                        key={item.product.id}
                      >
                        <Card.Body
                          border={0}
                          className="square border-bottom"
                          aria-label="Form"
                        >
                          <Row>
                            <Col lg={6}>
                              <Card.Text
                                style={{ fontSize: 12 }}
                                aria-label="Product"
                              >
                                {item.product.name}
                              </Card.Text>
                            </Col>
                            <Col lg={2}>
                              <Card.Text
                                style={{ fontSize: 12 }}
                                aria-label="Quantity"
                              >
                                Quantity: {item.quantity}
                              </Card.Text>
                            </Col>
                            <Col lg={2}>
                              <Card.Text
                                style={{ fontSize: 12 }}
                                aria-label="Price"
                              >
                                Price: ${item.product.price}
                              </Card.Text>
                            </Col>
                            <Col lg={2}>
                              <CloseButton
                                aria-label="Remove"
                                onClick={() =>
                                  this.handleRemove(
                                    cart,
                                    item.product,
                                    -item.quantity
                                  )
                                }
                              ></CloseButton>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    );
                  })}
                  <Card style={{ minHeight: '8rem', border: 0 }}>
                    <Card.Body className="square border-top">
                      <Row>
                        <Col lg={2}></Col>
                        <Col lg={7}>Subtotal</Col>
                        <Col lg={1}></Col>
                        <Col lg={2}>${amount}</Col>
                      </Row>
                      <Row>
                        <Col lg={2}></Col>
                        <Col lg={7}>Shipping</Col>
                        <Col lg={1}></Col>
                        <Col lg={2}>Free</Col>
                      </Row>
                      <Row>
                        <Col lg={2}></Col>
                        <Col lg={7}>Estimated tax for: {zip}</Col>
                        <Col lg={1}></Col>
                        <Col lg={2}>{tax}%</Col>
                      </Row>
                      <Row>
                        <Col lg={2}></Col>
                        <Col lg={7}>Total</Col>
                        <Col lg={1}></Col>
                        <Col lg={2}>${total}</Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card style={{ minHeight: '3rem', border: 0 }}>
                    <Card.Body border={0} className="square border-bottom">
                      <Row>Where should we send your order?</Row>
                      <Row>
                        <Col lg={6}>
                          <Form>
                            <Form.Group
                              className="mb-3"
                              controlId="formFirstName"
                            >
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                name="first"
                                type="name"
                                placeholder="Enter first name"
                                value={this.state.first || ''}
                                onChange={this.handleChange}
                                isInvalid={!!this.state.validationErrors.first}
                              />
                              <Form.Control.Feedback type="invalid">
                                {this.state.validationErrors.first}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col lg={6}>
                          <Form>
                            <Form.Group
                              className="mb-3"
                              controlId="formLastName"
                            >
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control
                                name="last"
                                type="name"
                                placeholder="Enter last name"
                                value={this.state.last}
                                onChange={this.handleChange}
                                isInvalid={!!this.state.validationErrors.last}
                              />
                              <Form.Control.Feedback type="invalid">
                                {this.state.validationErrors.last}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <Form>
                            <Form.Group className="mb-3" controlId="formEmail">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                name="email"
                                type="name"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                isInvalid={!!this.state.validationErrors.email}
                              />
                              <Form.Control.Feedback type="invalid">
                                {this.state.validationErrors.email}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col lg={6}></Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <Form>
                            <Form.Group
                              className="mb-3"
                              controlId="formAddressName"
                            >
                              <Form.Label>Street Address</Form.Label>
                              <Form.Control
                                name="address"
                                type="address"
                                placeholder="Enter street address"
                                value={this.state.address}
                                onChange={this.handleChange}
                                isInvalid={
                                  !!this.state.validationErrors.address
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {this.state.validationErrors.address}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col lg={6}>
                          <Form>
                            <Form.Group className="mb-3" controlId="formCity">
                              <Form.Label>City</Form.Label>
                              <Form.Control
                                name="city"
                                type="name"
                                placeholder="Enter city"
                                value={this.state.city}
                                onChange={this.handleChange}
                                isInvalid={!!this.state.validationErrors.city}
                              />
                              <Form.Control.Feedback type="invalid">
                                {this.state.validationErrors.city}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <Form>
                            <Form.Group className="mb-3" controlId="formState">
                              <Form.Label>State</Form.Label>
                              <Form.Control
                                name="state"
                                type="name"
                                placeholder="Enter state"
                                value={this.state.state}
                                onChange={this.handleChange}
                                isInvalid={!!this.state.validationErrors.state}
                              />
                              <Form.Control.Feedback type="invalid">
                                {this.state.validationErrors.state}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col lg={6}>
                          <Form>
                            <Form.Group className="mb-3" controlId="formZip">
                              <Form.Label>Zip Code</Form.Label>
                              <Form.Control
                                name="zip"
                                type="name"
                                placeholder="Enter zip code"
                                value={this.state.zip}
                                onChange={this.handleChange}
                                isInvalid={!!this.state.validationErrors.zip}
                              />
                              <Form.Control.Feedback type="invalid">
                                {this.state.validationErrors.zip}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <Form>
                            <Form.Group className="mb-3" controlId="formPhone">
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control
                                name="phone"
                                type="name"
                                placeholder="Enter phone numer"
                                value={this.state.phone}
                                onChange={this.handleChange}
                                isInvalid={!!this.state.validationErrors.phone}
                              />
                              <Form.Control.Feedback type="invalid">
                                {this.state.validationErrors.phone}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                      <Row>
                        {console.log(history)}
                        {this.shouldShowPaymentForm() ? (
                          <MyPaymentForm
                            amount={amount * 100}
                            first={this.state.first}
                            zip={zip}
                            handleCompleteTransaction={(paymentId) =>
                              this.handleCompleteTransaction(
                                lineItems,
                                paymentId
                              )
                            }
                            addOrders={() => this.props.addOrders(history)}
                            {...this.state}
                          />
                        ) : null}
                      </Row>
                    </Card.Body>
                  </Card>
                </Container>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateQuantity: (item) => dispatch(updateQuantity(item)),
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckOut)
);
