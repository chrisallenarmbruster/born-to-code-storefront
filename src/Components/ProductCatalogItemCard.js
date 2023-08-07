import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';

const ProductCatalogItemCard = ({ product }) => {
  return (
    <Card key={product.id} className="h-100 shadow">
      <Card.Img className="p-5" variant="top" src={product.imageUrl1} />
      <Card.Body>
        <Card.Title className="text-center">{product.name}</Card.Title>
      </Card.Body>
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
