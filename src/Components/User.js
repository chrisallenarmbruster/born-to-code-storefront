import React from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { adjustUserDetails } from '../store/auth';
import { useNavigate } from 'react-router-dom';

const User = (props) => {
  const [show, setShow] = useState(false);
  const [historyShow, setHistoryShow] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
  });

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleHistoryClose = () => setHistoryShow(false);
  const handleHistoryShow = () => setHistoryShow(true);

  const { auth } = props;

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
              <Card.Text>User Email: {auth.email}</Card.Text>
              <Card.Text>User Address: {auth.address}</Card.Text>
              <Card.Text>User City: {auth.city}</Card.Text>
              <Card.Text>User State: {auth.state}</Card.Text>
              <Card.Text>User Country: {auth.country}</Card.Text>
              <Card.Text>User Zipcode: {auth.zip}</Card.Text>
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
