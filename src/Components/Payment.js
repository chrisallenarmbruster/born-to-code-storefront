// Dependencies
import * as React from 'react';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
//   NOTE: collect payment info to send to db as an order

const MyPaymentForm = (props) => {
  let { amount } = props;
  let { zip } = props;
  console.log('zip ', zip);
  return (
    <div>
      <PaymentForm
        applicationId="sandbox-sq0idb-9aiQYyJJerVQ_xS_gMVOmA"
        cardTokenizeResponseReceived={async (token, buyer) => {
          const response = await fetch('/api/pay', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sourceId: token.token,
              amount: amount,
            }),
          });
          console.log('response ', await response.json());
          alert('Payment complete! ', JSON.stringify(await response.json()));
        }}
        locationId="LFJJJ47TKFPE2"
      >
        <CreditCard
          includeInputLabels
          postalCode={zip.zip}
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
      </PaymentForm>
    </div>
  );
};
export default MyPaymentForm;
