import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../store/productAll';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import ProductCatalogItemCard from './ProductCatalogItemCard';
import Pagination from './Pagination';

export class ProductAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      recordsPerPage: 6,
    };
  }

  componentDidMount() {
    this.props.setProducts();
  }

  render() {
    const indexOfLastRecord =
      this.state.currentPage * this.state.recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - this.state.recordsPerPage;
    const currentRecords = this.props.products.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );

    return (
      <Container className="mt-4">
        {this.props.isLoading ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <React.Fragment>
            <Row xs={1} md={2} lg={3} className="g-5">
              {currentRecords.map((product) => (
                <Col key={product.id} className="g-5">
                  <ProductCatalogItemCard product={product} />
                </Col>
              ))}
            </Row>
            <React.Fragment>
              {this.props.products.length > this.state.recordsPerPage ? (
                <div className="pagination justify-content-center flex-wrap mt-5">
                  <Pagination
                    recordsPerPage={this.state.recordsPerPage}
                    totalRecords={this.props.products.length}
                    paginate={(pageNumber) =>
                      this.setState({ ...this.state, currentPage: pageNumber })
                    }
                    currentPage={this.state.currentPage}
                  />
                </div>
              ) : (
                ''
              )}
            </React.Fragment>
          </React.Fragment>
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
