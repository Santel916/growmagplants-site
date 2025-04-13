const stripe = require('stripe')(process.env.sk_test_51RCN4OPRHC7jcWnU8ZIIwbZkOQFFOrOIZm6p5cvC1huidHtcVYK3i6C7HoEyyqSrSJONjxECWGCiy2Yf2xCXvLhS00sBMCEiMe); // Secret key from Stripe

exports.handler = async (event, context) => {
  try {
    const { amount } = JSON.parse(event.body);

    // Create a Checkout Session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',  // Set currency to EUR
            product_data: {
              name: 'In-game Currency',  // You can change this to match your product
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.URL}/success.html`,
      cancel_url: `${process.env.URL}/cancel.html`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    console.error('Error creating checkout session', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

