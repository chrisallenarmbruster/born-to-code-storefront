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
    let temp = await this.props.addToCart({ product, quantity });
    console.log('handleAddToCart', temp);
  }
  render(props) {
    const { handleAddToCart } = this;
    const { product } = this.props;
    return (
      <Button onClick={(evt) => handleAddToCart(evt, product, 1)}>
        <i className="bi bi-cart-plus"></i>
      </Button>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.allProducts.data,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch(addToCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
