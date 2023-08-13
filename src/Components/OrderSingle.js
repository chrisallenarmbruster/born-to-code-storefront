import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import OrderLine from './OrderLine';
import Table from 'react-bootstrap/Table';

const OrderSingle = (props) => {
  return (
    <Container className="mb-5">
      <Table responsive>
        <thead>
          <tr>
            <th style={{ width: '60%' }}>Order #</th>
            <th style={{ width: '20%' }} className="text-center">
              Date
            </th>
            <th style={{ width: '20%' }} className="text-center">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.order.id}</td>
            <td className="text-center">
              {props.order.orderDate.slice(0, 10)}
            </td>
            <td className="text-center">
              ${parseInt(props.order.amount / 100).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </Table>
      <Container>
        <Table bordered striped responsive>
          <thead>
            <tr>
              <th>Item</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Review</th>
            </tr>
          </thead>
          <tbody>
            {props.order.lineItems.map((lineItem) => (
              <OrderLine key={lineItem.id} lineItem={lineItem} />
            ))}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default OrderSingle;
