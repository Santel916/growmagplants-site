const stripe = require('stripe')('sk_test_51RCN4OPRHC7jcWnU8ZIIwbZkOQFFOrOIZm6p5cvC1huidHtcVYK3i6C7HoEyyqSrSJONjxECWGCiy2Yf2xCXvLhS00sBMCEiMe'); // Your Stripe secret key

exports.handler = async function(event) {
  try {
    const { amount } = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Currency C$',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://growmagplants.com/success',
      cancel_url: 'https://growmagplants.com/cancel',
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ id: session.id }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
