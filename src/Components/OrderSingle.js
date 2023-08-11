import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import OrderLine from './OrderLine';

const OrderSingle = (props) => {
  return (
    <Container className="mb-5">
      <span className="fw-bold">Order #: </span>
      {props.order.id} (<span className="fw-bold">Date:</span>{' '}
      {props.order.orderDate})
      <Container>
        {props.order.lineItems.map((lineItem) => (
          <OrderLine key={lineItem.id} lineItem={lineItem} />
        ))}
      </Container>
    </Container>
  );
};

export default OrderSingle;
