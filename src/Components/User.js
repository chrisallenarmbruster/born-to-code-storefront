import React from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { adjustUserDetails } from '../store/auth';

const User = (props) => {
  const [show, setShow] = useState(false);
  const [historyShow, setHistoryShow] = useState(false);
  const [userDetails, setUserDetails] = useState({ 
    email: '', 
    Address: '', 
    city: '', 
    state: '', 
    country: '', 
    zip: '' 
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleHistoryClose = () => setHistoryShow(false);
  const handleHistoryShow = () => setHistoryShow(true);

  const { auth } = props;

  const handleChange = (ev) => {
    setUserDetails({
      ...userDetails, [ev.target.name]: ev.target.value
    });
  };

  const { adjustUserDetails } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);
    adjustUserDetails(userDetails);
    console.log(userDetails);
  };

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
            {auth.email}
            {auth.Address}
            {auth.city}
            {auth.state}
            {auth.country}
            {auth.zip}
          </Card.Text>
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
                    <Form.Control type="email" placeholder="Enter email" value={userDetails.email} name="email" onChange={handleChange}/>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Address" value={userDetails.Address} name="Address" onChange={handleChange}/>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" value={userDetails.city} name="city" onChange={handleChange} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="State" value={userDetails.state} name="state" onChange={handleChange} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Country" value={userDetails.country} name="country" onChange={handleChange} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="text" placeholder="Zip Code" value={userDetails.zip} name="zip" onChange={handleChange} />
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
      
          <Card.Link onClick={handleHistoryShow}>See Order History</Card.Link>
          <Modal show={historyShow} onHide={handleHistoryClose}>
            <Modal.Header closeButton>
              <Modal.Title>{auth.username} Order History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleHistoryClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleHistoryClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
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

const mapDispatchToProps = (dispatch) => {
  return {
    adjustUserDetails: (user) => dispatch(adjustUserDetails(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);

