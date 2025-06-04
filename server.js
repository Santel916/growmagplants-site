const stripe = require('stripe')('sk_test_51RCN4OPRHC7jcWnU8ZIIwbZkOQFFOrOIZm6p5cvC1huidHtcVYK3i6C7HoEyyqSrSJONjxECWGCiy2Yf2xCXvLhS00sBMCEiMe'); // Use your secret key

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      const { amount } = JSON.parse(event.body);

      // Create a checkout session with Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Currency C$',
              },
              unit_amount: amount * 100, // Amount in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `https://growmagplants.com/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'https://growmagplants.com/cancel.html',
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ id: session.id }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }
};
