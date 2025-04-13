// netlify/functions/create-checkout-session.js
const stripe = require('stripe')('sk_test_51RCN4OPRHC7jcWnU8ZIIwbZkOQFFOrOIZm6p5cvC1huidHtcVYK3i6C7HoEyyqSrSJONjxECWGCiy2Yf2xCXvLhS00sBMCEiMe'); // Your Stripe secret key

exports.handler = async function(event, context) {
  try {
    const { amount } = JSON.parse(event.body); // Get the amount from the request body

    // Create a new Checkout session with the selected amount
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Currency C$',
            },
            unit_amount: amount * 100, // Amount is in euros, multiply by 100 to get the cents
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
      body: JSON.stringify({ id: session.id }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

