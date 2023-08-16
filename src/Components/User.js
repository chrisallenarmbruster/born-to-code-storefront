import React from 'react';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { adjustUserDetails } from '../store/auth';
import { useNavigate, useLocation } from 'react-router-dom';

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
    <div>
      {auth.id ? (
        <div>
          <Card className="text-center">
            <Card.Header>User Profile</Card.Header>
            <Card.Body>
              <Card.Title>Welcome {auth.username}</Card.Title>
              <Card.Text>First Name: {auth.firstName}</Card.Text>
              <Card.Text>Last Name: {auth.lastName}</Card.Text>
              <Card.Text>Email: {auth.email}</Card.Text>
              <Card.Text>Phone: {auth.phone}</Card.Text>
              <Card.Text>Address: {auth.address}</Card.Text>
              <Card.Text>City: {auth.city}</Card.Text>
              <Card.Text>State: {auth.state}</Card.Text>
              <Card.Text>Country: {auth.country}</Card.Text>
              <Card.Text>Zip Code: {auth.zip}</Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Link onClick={handleShow}>Edit User Info</Card.Link>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit {auth.username} Info</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Modal.Body>
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
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>

              <Card.Link onClick={() => navigate(`/users/${auth.id}/orders`)}>
                See Order History
              </Card.Link>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div>
          <Card className="text-center">
            <Card.Header>User Profile</Card.Header>
            <Card.Body>
              <Card.Title>You must be logged in to see User Info</Card.Title>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
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
