import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../store/productAll';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import AddToCart from './AddToCart';

export class ProductAll extends Component {
  componentDidMount() {
    this.props.setProducts();
  }

  render() {
    return (
      <Container>
        {this.props.isLoading ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
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
                    <span>
                      <AddToCart product={product} />
                      <Link to={`/products/${product.id}`} className="ms-1">
                        <Button title="Details" variant="primary">
                          <i className="bi bi-list-ul"></i>
                        </Button>
                      </Link>
                    </span>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductAll);
