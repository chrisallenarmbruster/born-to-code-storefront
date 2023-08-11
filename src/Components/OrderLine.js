import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import ProductReviewCreate from './ProductReviewCreate';

const OrderLine = (props) => {
  console.log('inside OrderLine', props);
  return (
    <Fragment>
      <div>
        {props.lineItem.quantity} - {props.lineItem.product.name}{' '}
        <ProductReviewCreate productId={props.lineItem.product.id} />
      </div>
    </Fragment>
  );
};

export default OrderLine;
