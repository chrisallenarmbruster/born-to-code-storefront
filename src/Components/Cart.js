import React from 'react';
import { logout } from '../store';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Cart = (props) => {
  console.log('my props', props);
  const cart = props.cart;
  return (
    <div className="container">
      <h1>Cart</h1>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { cart: state.cart };
};

export default connect(mapStateToProps)(Cart);
