import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../store/cart';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  async handleAddToCart(evt, product, quantity) {
    evt.preventDefault();
    console.log('inside handleAddToCart', product, quantity);
    await this.props.addToCart({ product, quantity });
  }
  render() {
    const { handleAddToCart } = this;
    return (
      <Button onClick={(evt) => handleAddToCart(evt, product, 1)}>
        <i className="bi bi-cart-plus"></i>
      </Button>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productAll.products,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch(addToCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
