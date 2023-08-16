import React, { Component, Fragment } from 'react';
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
      search: '',
    };
  }

  componentDidMount() {
    this.props.setProducts();

    let search = queryToStr.parse(this.props.router.location.search)?.search;
    if (search) {
      this.setState({
        ...this.state,
        search: search,
        category: 'all',
      });
      this.props.router.navigate(`/products?search=${search}`);
    } else {
      let category = queryToStr.parse(
        this.props.router.location.search
      )?.category;
      if (category) {
        if (['all', 'shirts', 'hats', 'mugs'].includes(category)) {
          this.setState({
            ...this.state,
            category: category,
            search: '',
          });
        } else {
          this.setState({
            ...this.state,
            category: 'all',
            search: '',
          });
        }
      } else {
        this.setState({
          ...this.state,
          category: 'all',
          search: '',
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.router.location.search !== this.props.router.location.search
    ) {
      let search = queryToStr.parse(this.props.router.location.search)?.search;
      if (search) {
        this.setState({
          ...this.state,
          search: search,
          currentPage: 1,
          category: 'all',
        });
        this.props.router.navigate(`/products?search=${search}`);
      } else {
        let category = queryToStr.parse(
          this.props.router.location.search
        )?.category;
        if (category) {
          if (['all', 'shirts', 'hats', 'mugs'].includes(category)) {
            this.setState({
              ...this.state,
              category: category,
              currentPage: 1,
              search: '',
            });
          } else {
            this.setState({
              ...this.state,
              category: 'all',
              search: '',
            });
          }
        } else {
          this.setState({
            ...this.state,
            category: 'all',
            currentPage: 1,
            search: '',
          });
        }
      }
    }
  }

  render() {
    let filteredProducts = this.props.products.filter((product) => {
      if (this.state.search.length > 0) {
        return product.name
          .toLowerCase()
          .includes(this.state.search.toLowerCase());
      }
      if (this.state.category === 'all') {
        return true;
      } else {
        return product.category === this.state.category;
      }
    });

    const hasData = filteredProducts.length > 0;
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
          <Fragment>
            <div className="d-flex text-center justify-content-center flex-wrap mb-1 mt-5">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link
                    href="/#/products?category=all"
                    active={this.state.category === 'all' && !this.state.search}
                  >
                    Shop All
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="/#/products?category=hats"
                    active={this.state.category === 'hats'}
                  >
                    Hats
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="/#/products?category=shirts"
                    active={this.state.category === 'shirts'}
                  >
                    Shirts
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="/#/products?category=mugs"
                    active={this.state.category === 'mugs'}
                  >
                    Mugs
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <div className="d-flex justify-content-center flex-wrap mt-3 mb-0">
              {this.state.search.length > 0 ? (
                <h1 className="h4 mt-0">
                  Search Results for{' '}
                  <span className="fst-italic">{this.state.search}</span>:
                </h1>
              ) : (
                ''
              )}
            </div>
            <Fragment>
              {hasData ? (
                <div className="mt-5">
                  <Row xs={1} md={2} lg={3} className="g-5">
                    {currentRecords.map((product) => (
                      <Col key={product.id} className="g-5">
                        <ProductCatalogItemCard product={product} />
                      </Col>
                    ))}
                  </Row>
                  <Fragment>
                    {filteredProducts.length > this.state.recordsPerPage ? (
                      <div className="pagination justify-content-center flex-wrap mt-5 mb-3">
                        <Pagination
                          recordsPerPage={this.state.recordsPerPage}
                          totalRecords={filteredProducts.length}
                          paginate={(pageNumber) =>
                            this.setState({
                              ...this.state,
                              currentPage: pageNumber,
                            })
                          }
                          currentPage={this.state.currentPage}
                        />
                      </div>
                    ) : (
                      <Container className="mb-5"> </Container>
                    )}
                  </Fragment>
                </div>
              ) : (
                <div className="d-flex justify-content-center mt-3">
                  <h1 className="h4 mt-0">No items found.</h1>
                </div>
              )}
            </Fragment>
          </Fragment>
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
