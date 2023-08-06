// Dependencies
import * as React from 'react';
import { CreditCard, ApplePay } from 'react-square-web-payments-sdk';

const MyPaymentForm = () => {
  return (
    <div>
      <CreditCard includeInputLabels postalCode="12345" />
    </div>
  );
};
export default MyPaymentForm;
