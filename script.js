async function triggerPayment() {
  const amount = parseFloat(document.getElementById('custom-price').textContent);
  if (isNaN(amount) || amount <= 0) {
    alert('Please select a valid amount.');
    return;
  }

  const response = await fetch('.netlify/functions/create-checkout-session', { // Change to use Netlify function path
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }), // Sending amount to the backend
  });

  const session = await response.json();
  const stripe = Stripe('pk_test_51RCN4OPRHC7jcWnUpBPFBn5qwZBeepmXBEpz1MBDU3Q5kSATAKAtx5Yu04huzk1TTlGFRcrkmbNcJky7u9DhlzmI00MlQAplBZ');
  stripe.redirectToCheckout({ sessionId: session.id });
}
