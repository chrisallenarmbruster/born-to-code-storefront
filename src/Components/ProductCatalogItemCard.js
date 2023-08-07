import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';
import ProductReviewStars from './ProductReviewStars';

const ProductCatalogItemCard = ({ product }) => {
  return (
    <Card key={product.id} className="h-100 shadow">
      <Link to={`/products/${product.id}`}>
        <Card.Img className="p-5" variant="top" src={product.imageUrl1} />
      </Link>
      <Card.Body></Card.Body>
      <Card.Footer className="d-flex justify-content-center  unformatted-footer mb-3">
        <span className="text-center">
          <Link to={`/products/${product.id}`} className="text-decoration-none">
            <Card.Title className="text-center">{product.name}</Card.Title>
          </Link>
          <span className="d-flex justify-content-center">
            <ProductReviewStars rating={product.rating} />
          </span>
        </span>
      </Card.Footer>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <span className="fw-bold h4">{`$${product.price}`}</span>{' '}
        <span>
          <span title="Add to Cart">
            <AddToCart product={product} />
          </span>
          <Link to={`/products/${product.id}`} className="ms-1">
            <Button title="Details" variant="primary">
              <i className="bi bi-list-ul"></i>
            </Button>
          </Link>
        </span>
      </Card.Footer>
    </Card>
  );
};

export default ProductCatalogItemCard;
