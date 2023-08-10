import React from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';

const User = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { auth } = props;

  return (
    <div>
      {auth.id ? (<div>
        <Card className="text-center">
        <Card.Header>User Profile</Card.Header>
        <Card.Body>
          <Card.Title>Welcome {auth.username}</Card.Title>
          <Card.Text>
            lorem ipsum dolor sit amet, consectetur adipiscing 
            lorem ipsum dolor sit amet
            lorem ipsum dolor sit
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Link onClick={handleShow}>Edit User Info</Card.Link>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit {auth.username} Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="Address" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="City" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control type="text" placeholder="Zip Code" />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <Card.Link href="#">See Order History</Card.Link>
        </Card.Body>
      </Card>
      </div>) 
      : (<div>
        <Card className="text-center">
        <Card.Header>User Profile</Card.Header>
        <Card.Body>
          <Card.Title>You must be logged in to see User Info</Card.Title>        
        </Card.Body>
      </Card>
      </div>)}
      
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(User);

