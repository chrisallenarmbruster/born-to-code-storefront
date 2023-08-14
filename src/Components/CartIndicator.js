import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import { getNumberOfItems } from '../store/cart';

class CartIndicator extends Component {
  render() {
    const { numberOfItems } = this.props;
    return (
      <Nav.Link href="#/cart" className="cart-indicator-button">
        <Button
          variant="outline-secondary"
          className="position-relative me-3 border border-secondary rounded"
          size="lg"
        >
          <i className="bi bi-cart m-0 me-2 "></i>
          <span className="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-primary">
            {numberOfItems}
            <span className="visually-hidden">items in cart</span>
          </span>
        </Button>
      </Nav.Link>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    numberOfItems: getNumberOfItems(state),
  };
};

export default connect(mapStateToProps)(CartIndicator);
