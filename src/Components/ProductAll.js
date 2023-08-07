import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../store/productAll';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import ProductCatalogItemCard from './ProductCatalogItemCard';
import Pagination from './Pagination';
import { withRouter } from '../utils/withRouter';
import queryToStr from 'query-string';
import Nav from 'react-bootstrap/Nav';

export class ProductAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all',
      currentPage: 1,
      recordsPerPage: 6,
    };
  }

  componentDidMount() {
    this.props.setProducts();
    let category = queryToStr.parse(
      this.props.router.location.search
    )?.category;
    if (category) {
      if (['all', 'shirts', 'hats', 'mugs'].includes(category)) {
        this.setState({
          ...this.state,
          category: queryToStr.parse(this.props.router.location.search)
            .category,
        });
      } else {
        this.setState({
          ...this.state,
          category: 'all',
        });
      }
    } else {
      this.setState({
        ...this.state,
        category: 'all',
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.router.location.search !== this.props.router.location.search
    ) {
      let category = queryToStr.parse(
        this.props.router.location.search
      )?.category;
      if (category) {
        if (['all', 'shirts', 'hats', 'mugs'].includes(category)) {
          this.setState({
            ...this.state,
            category: category,
            currentPage: 1,
          });
        } else {
          this.setState({
            ...this.state,
            category: 'all',
          });
        }
      } else {
        this.setState({
          ...this.state,
          category: 'all',
          currentPage: 1,
        });
      }
    }
  }

  render() {
    let filteredProducts = this.props.products.filter((product) => {
      if (this.state.category === 'all') {
        return true;
      } else {
        return product.category === this.state.category;
      }
    });

    const indexOfLastRecord =
      this.state.currentPage * this.state.recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - this.state.recordsPerPage;
    const currentRecords = filteredProducts.slice(
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
            <div className="d-flex text-center justify-content-center flex-wrap mt-5 mb-5">
              <Nav
                variant="pills"
                defaultActiveKey={`/#/products?category=${this.state.category}`}
              >
                <Nav.Item>
                  <Nav.Link href="/#/products?category=all">Shop All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/#/products?category=hats">Hats</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/#/products?category=shirts">Shirts</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/#/products?category=mugs">Mugs</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <Row xs={1} md={2} lg={3} className="g-5">
              {currentRecords.map((product) => (
                <Col key={product.id} className="g-5">
                  <ProductCatalogItemCard product={product} />
                </Col>
              ))}
            </Row>
            <React.Fragment>
              {filteredProducts.length > this.state.recordsPerPage ? (
                <div className="pagination justify-content-center flex-wrap mt-5 mb-3">
                  <Pagination
                    recordsPerPage={this.state.recordsPerPage}
                    totalRecords={filteredProducts.length}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductAll)
);
