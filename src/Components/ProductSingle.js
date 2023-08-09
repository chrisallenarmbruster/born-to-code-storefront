import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { clearSingleProduct, setSingleProduct } from '../store/productSingle';
import { withRouter } from '../utils/withRouter';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import AddToCart from './AddToCart';
import Button from 'react-bootstrap/Button';
import ProductReviewStars from './ProductReviewStars';
import ProductReviewCreate from './ProductReviewCreate';

export class ProductSingle extends Component {
  constructor() {
    super();
    this.state = { size: null };
  }

  componentDidMount() {
    this.props.setSingleProduct(this.props.router.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.router.params.id !== this.props.router.params.id) {
      this.props.setSingleProduct(this.props.router.params.id);
    }
  }

  componentWillUnmount() {
    this.props.clearSingleProduct();
  }

  render() {
    const hasData = this.props.product && this.props.product.id;
    return (
      <Container className="mt-5">
        {this.props.isLoading ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : hasData ? (
          <Fragment>
            <Row className="g-5">
              <Col sm={12} md={6}>
                <img
                  src={this.props.product.imageUrl1}
                  alt={this.props.product.name}
                  className="img-fluid"
                />
              </Col>
              <Col sm={12} md={6}>
                <h1 className="h2">{this.props.product.name}</h1>
                <hr className="my-0" />
                <span className="my-1 d-flex align-items-middle">
                  <span className="me-2 fw-bold">
                    {this.props.product.rating}
                  </span>
                  <ProductReviewStars rating={this.props.product.rating} />
                  <span className="ms-2 text-secondary">
                    ( {this.props.product.reviewCount} ratings)
                  </span>
                </span>
                <h2>
                  {`$${this.props.product.price}`}
                  <span title="Add to Cart" className="ms-3">
                    <AddToCart product={this.props.product} />
                  </span>
                  <span className="ms-1">
                    <Button
                      title="Go Back"
                      variant="primary"
                      onClick={() => this.props.router.navigate(-1)}
                    >
                      <i className="bi bi-arrow-left"></i>
                    </Button>
                  </span>
                </h2>
                <h4 className="mt-3">
                  {this.props.product.color && (
                    <span className="me-5">
                      Color: {this.props.product.color}
                    </span>
                  )}
                  {this.props.product.sizeOptions && (
                    <span>
                      Sizes:{' '}
                      {this.props.product.sizeOptions.split(',').join(', ')}
                    </span>
                  )}
                </h4>
                <p>{this.props.product.description}</p>
                <h4>About this item:</h4>
                <ListGroup variant="flush">
                  <ListGroup.Item>{this.props.product.spec1}</ListGroup.Item>
                  <ListGroup.Item>{this.props.product.spec2}</ListGroup.Item>
                  <ListGroup.Item>{this.props.product.spec3}s</ListGroup.Item>
                  <ListGroup.Item>{this.props.product.spec4}</ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            {/* <ProductReviewCreate productId={this.props.product.id} /> */}
          </Fragment>
        ) : (
          <div>
            No detail found for product id {this.props.router.params.id}
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.singleProduct.data,
    isLoading: state.singleProduct.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSingleProduct: (id) => dispatch(setSingleProduct(id)),
    clearSingleProduct: () => dispatch(clearSingleProduct()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductSingle)
);
