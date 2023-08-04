import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../store/productAll';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export class ProductAll extends Component {
  componentDidMount() {
    this.props.setProducts();
  }

  render() {
    return (
      <Container>
        {this.props.isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-5">
            {this.props.products.map((product) => (
              <Col className="g-5">
                <Card key={product.id} className="h-100 shadow">
                  <Card.Img variant="top" src={product.imageUrl1} />
                  <Card.Body>
                    <Card.Title>
                      {product.name} {product.color ? `(${product.color})` : ''}
                    </Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>{product.price}</Card.Text>
                  </Card.Body>
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
