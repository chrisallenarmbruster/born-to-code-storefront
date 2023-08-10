import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { connect } from 'react-redux';

const User = (props) => {
  const { auth } = props;

  return (
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
          <Card.Link href="#">Edit User Info</Card.Link>
          <Card.Link href="#">See Order History</Card.Link>
        </Card.Body>
      </Card>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(User);

