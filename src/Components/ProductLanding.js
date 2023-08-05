import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ProductLanding = () => {
  return (
    <div className="container">
      <h1>Future Product Landing Page</h1>
      <div>
        <Link to="/products">
          <Button variant="primary">Go to Products</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductLanding;
