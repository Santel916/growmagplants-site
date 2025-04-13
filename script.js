async function triggerPayment() {
  const amount = parseFloat(document.getElementById('custom-price').textContent);
  if (isNaN(amount) || amount <= 0) {
    alert('Please select a valid amount.');
    return;
  }

  // Update the fetch URL to point to your Netlify function
  const response = await fetch('/.netlify/functions/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  });

  const session = await response.json();
  const stripe = Stripe('pk_test_51RCN4OPRHC7jcWnUpBPFBn5qwZBeepmXBEpz1MBDU3Q5kSATAKAtx5Yu04huzk1TTlGFRcrkmbNcJky7u9DhlzmI00MlQAplBZ'); // Your Stripe public key
  stripe.redirectToCheckout({ sessionId: session.id });
}
