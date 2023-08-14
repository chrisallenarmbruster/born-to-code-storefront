export async function emailClient(email, orderId) {
  console.log('sending email to : ', email, ' with order id: ', orderId);
  await fetch('/api/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: email,
      subject: `Order ${orderId} Confirmation`,
      textBody: `Thank you for your order! Your order number is ${orderId}.`,
      from: 'joel.janov@regiscompany.com',
    }),
  })
    .then(async (response) => await response.json())
    .then((data) => {
      console.log(data);
      // handle the response data
    })
    .catch((error) => console.error(error));
}
