import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../store/productAll';
import { addToCart } from '../store/cart';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class ProductAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    this.props.setProducts();
  }

  async handleAddToCart(evt, product, quantity) {
    evt.preventDefault();
    console.log('inside handleAddToCart', product, quantity);
    await this.props.addToCart({ product, quantity });
  }
  render() {
    const { handleAddToCart } = this;
    return (
      <Container>
        {this.props.isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-5">
            {this.props.products.map((product) => (
              <Col key={product.id} className="g-5">
                <Card key={product.id} className="h-100 shadow">
                  <Card.Img variant="top" src={product.imageUrl1} />
                  <Card.Body>
                    <Card.Title>
                      {product.name} {product.color ? `(${product.color})` : ''}
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">{`$${product.price}`}</span>{' '}
                    <Button onClick={(evt) => handleAddToCart(evt, product, 1)}>
                      <i className="bi bi-cart-plus"></i>
                    </Button>
                    <Link to={`/products/${product.id}`}>
                      <Button title="Details" variant="primary">
                        <i className="bi bi-list-ul"></i>
                      </Button>
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.allProducts.data,

  isLoading: state.allProducts.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  setProducts: () => dispatch(setProducts()),
  addToCart: (product) => dispatch(addToCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductAll);
