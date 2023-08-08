import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { setProducts } from '../store/productAll';
import Spinner from 'react-bootstrap/Spinner';
import ProductCatalogItemCard from './ProductCatalogItemCard';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export class ProductFeaturedItems extends Component {
  componentDidMount() {
    this.props.setProducts();
  }

  render() {
    function shuffleArray(array) {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      return shuffledArray;
    }

    let featuredItems = shuffleArray(
      this.props.products.filter((product) => {
        return product.isFeatured;
      })
    ).slice(0, 3);

    const hasData = featuredItems.length > 0;

    return (
      <Container className="p-5">
        {this.props.isLoading ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : hasData ? (
          <React.Fragment>
            <div className="h3 text-center mb-0">Featured Coding Gear</div>
            <div className="h6 text-center mt-0 mb-5 ">
              <Link to="/products" className="text-decoration-none">
                Browse Our Entire Collection
              </Link>
            </div>
            <Row xs={1} md={2} lg={3} className="g-5">
              {featuredItems.map((product) => (
                <Col key={product.id} className="g-5">
                  <ProductCatalogItemCard product={product} />
                </Col>
              ))}
            </Row>
          </React.Fragment>
        ) : (
          ''
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductFeaturedItems);
