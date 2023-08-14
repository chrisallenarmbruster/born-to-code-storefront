import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getNumberOfItems } from '../store/cart';

class CartIndicator extends Component {
  render() {
    const { numberOfItems } = this.props;
    return (

        <span className="cart-count">{numberOfItems}</span>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    numberOfItems: getNumberOfItems(state),
  };
};

export default connect(mapStateToProps)(CartIndicator);
