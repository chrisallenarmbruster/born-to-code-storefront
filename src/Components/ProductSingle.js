import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearSingleProduct, setSingleProduct } from '../store/productSingle';
import { withRouter } from '../utils/withRouter';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

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
      <Container>
        {this.props.isLoading ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : hasData ? (
          <h3>{this.props.product.name}</h3>
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
