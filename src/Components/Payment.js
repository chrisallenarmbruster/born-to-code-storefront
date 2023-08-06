// Dependencies
import * as React from 'react';
import { CreditCard, ApplePay } from 'react-square-web-payments-sdk';

const MyPaymentForm = () => {
  return (
    <div>
      <CreditCard
        includeInputLabels
        postalCode="12345"
        buttonProps={{
          css: {
            "[data-theme='dark'] &": {
              backgroundColor: '#61dafb',
              color: 'var(--ifm-color-emphasis-100)',
              '&:hover': {
                backgroundColor: '#0091ea',
              },
            },
            backgroundColor: '#771520',
            fontSize: '14px',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#530f16',
            },
          },
        }}
        style={{
          input: {
            fontSize: '14px',
          },
          'input::placeholder': {
            color: '#771520',
          },
        }}
      />
    </div>
  );
};
export default MyPaymentForm;
