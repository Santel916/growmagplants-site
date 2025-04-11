const express = require('express');
const stripe = require('stripe')('sk_test_51RCN4OPRHC7jcWnU8ZIIwbZkOQFFOrOIZm6p5cvC1huidHtcVYK3i6C7HoEyyqSrSJONjxECWGCiy2Yf2xCXvLhS00sBMCEiMe');
const path = require('path');
const app = express();
const port = 5000;

// Serve static files (HTML, CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON bodies
app.use(express.json());

// Serve index.html when the root URL is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Ensure index.html is in the root folder
});

// Create Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Currency Purchase',
            },
            unit_amount: amount * 100, // Stripe expects the amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5000/success',
      cancel_url: 'http://localhost:5000/cancel',
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Serve success page
app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'success.html')); // Ensure success.html is in the root folder
});

// Serve cancel page
app.get('/cancel', (req, res) => {
  res.sendFile(path.join(__dirname, 'cancel.html'));  // Ensure cancel.html is in the root folder
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
