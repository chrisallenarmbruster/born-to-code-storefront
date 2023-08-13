import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import ProductReviewCreate from './ProductReviewCreate';

const OrderLine = (props) => {
  return (
    <tr>
      <td style={{ width: '60%' }}>
        {props.lineItem.product.name}{' '}
        {props.lineItem.product.color
          ? `(${props.lineItem.product.color})`
          : ''}
      </td>
      <td style={{ width: '20%' }} className="text-center">
        {props.lineItem.quantity}
      </td>
      <td
        style={{ width: '20%', whiteSpace: 'nowrap', overflow: 'hidden' }}
        className="text-center"
      >
        <ProductReviewCreate productId={props.lineItem.product.id} />
      </td>
    </tr>
  );
};

export default OrderLine;
