import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../store/productAll';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import ProductCatalogItemCard from './ProductCatalogItemCard';

export class ProductAll extends Component {
  componentDidMount() {
    this.props.setProducts();
  }

  render() {
    return (
      <Container className="mt-4">
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
                <ProductCatalogItemCard product={product} />
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
