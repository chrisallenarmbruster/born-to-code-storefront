import React from 'react';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { adjustUserDetails } from '../store/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const User = (props) => {
  const [show, setShow] = useState(false);
  const [historyShow, setHistoryShow] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
  });

  const search = useLocation().search;

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { auth } = props;

  useEffect(() => {
    setUserDetails({
      firstName: auth.firstName,
      lastName: auth.lastName,
      email: auth.email,
      phone: auth.phone,
      address: auth.address,
      city: auth.city,
      state: auth.state,
      country: auth.country,
      zip: auth.zip,
    });
    const setup = new URLSearchParams(search).get('setup');
    if (setup) {
      handleShow();
    }
  }, []);

  const handleChange = (ev) => {
    setUserDetails({
      ...userDetails,
      [ev.target.name]: ev.target.value,
    });
  };

  const { adjustUserDetails } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    Object.keys(userDetails).forEach((key) => {
      if (userDetails[key] === '') {
        delete userDetails[key];
      }
    });

    adjustUserDetails(auth.id, userDetails);

    handleClose();
  };

  return (
    <Container className="mt-5">
      {auth.id ? (
        <>
          <Row className="g-5">
            <Col sm={12} md={3}></Col>
            <Col sm={12} md={6}>
              <Card>
                <Card.Header>
                  <Card.Title>Your Profile</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group className="mb-3">
                      <Form.Label>Login</Form.Label>
                      <Form.Control
                        type="username"
                        value={auth.username}
                        name="username"
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        value={auth.email}
                        name="email"
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type="text"
                        disabled
                        value={auth.firstName}
                        name="firstName"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        type="text"
                        value={auth.lastName}
                        name="lastName"
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="phone"
                        value={auth.phone}
                        name="phone"
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        value={auth.address}
                        name="address"
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        value={auth.city}
                        name="city"
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        value={auth.state}
                        name="state"
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        value={auth.country}
                        name="country"
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        type="text"
                        value={auth.zip}
                        name="zip"
                        disabled
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
                <Card.Footer>
                  <Card.Link
                    className="d-flex justify-content-end"
                    onClick={handleShow}
                  >
                    <Button>Edit User Info</Button>
                  </Card.Link>
                </Card.Footer>
              </Card>
            </Col>
            <Col sm={12} md={3}></Col>
          </Row>

          <Modal show={show} onHide={handleClose}>
            <Card>
              <Card.Body>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Modal.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Login</Form.Label>
                      <Form.Text>
                        <span className="d-block fw-bold h5">
                          {auth.username}
                        </span>
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={userDetails.email}
                        name="email"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        value={userDetails.firstName}
                        name="firstName"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        value={userDetails.lastName}
                        name="lastName"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="phone"
                        placeholder="Enter phone number"
                        value={userDetails.phone}
                        name="phone"
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        value={userDetails.address}
                        name="address"
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="City"
                        value={userDetails.city}
                        name="city"
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="State"
                        value={userDetails.state}
                        name="state"
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Country"
                        value={userDetails.country}
                        name="country"
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Zip Code"
                        value={userDetails.zip}
                        name="zip"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer className="pb-0">
                    <Button
                      className="mb-0"
                      variant="secondary"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                    <Button className="mb-0" variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
              </Card.Body>
            </Card>
          </Modal>
        </>
      ) : (
        <>
          <Card className="text-center">
            <Card.Header>User Profile</Card.Header>
            <Card.Body>
              <Card.Title>You must be logged in to see User Info</Card.Title>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adjustUserDetails: (userId, userData) =>
      dispatch(adjustUserDetails(userId, userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
