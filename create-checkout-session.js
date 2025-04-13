// Import Stripe module
const stripe = require('stripe')('sk_test_51RCN4OPRHC7jcWnU8ZIIwbZkOQFFOrOIZm6p5cvC1huidHtcVYK3i6C7HoEyyqSrSJONjxECWGCiy2Yf2xCXvLhS00sBMCEiMe'); // Replace with your Stripe secret key

// Handle the serverless function to create a Stripe Checkout session
exports.handler = async function(event, context) {
  try {
    // Parse the body of the request to get the amount
    const { amount } = JSON.parse(event.body); 

    // Create a new Checkout session with the selected amount
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],  // We are using card payments
      line_items: [
        {
          price_data: {
            currency: 'eur',  // Currency is Euro (EUR)
            product_data: {
              name: 'Currency C$',  // The name of the product
            },
            unit_amount: amount * 100, // Stripe expects the amount in cents, so we multiply by 100
          },
          quantity: 1,  // We are selling one item
        },
      ],
      mode: 'payment',  // Payment mode
      success_url: 'https://growmagplants.com/success',  // URL to redirect after successful payment
      cancel_url: 'https://growmagplants.com/cancel',  // URL to redirect after canceled payment
    });

    // Return the session ID as a response
    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (err) {
    // If an error occurs, return the error message
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
