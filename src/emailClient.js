export async function emailClient(email, orderId, lineItems) {
  const total = lineItems.reduce(
    (acc, item) => acc + Number(item.product.price),
    0
  );
  console.log(
    'sending email to : ',
    email,
    ' with order id: ',
    orderId,
    '  and line items: ',
    lineItems,
    ' and total: ',
    total
  );
  await fetch('/api/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: email,
      subject: `Order ${orderId} Confirmation`,
      textBody: `Thank you for your order! Your transaction number is ${orderId}. Here are your order details:\n\n${lineItems
        .map((item) => `${item.product.name} - $${item.product.price}`)
        .join('\n')}\n\nTotal: $${total.toFixed(2)}`,
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
