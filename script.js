const pricePer100K = 0.99;
const pricePerUnit = pricePer100K / 100000;

function selectCurrency(amount) {
  const price = (pricePerUnit * amount).toFixed(2);
  document.getElementById('custom-price').textContent = price;
}

function updateCustomPrice() {
  const customAmount = parseFloat(document.getElementById('custom-amount').value);
  const price = (pricePerUnit * customAmount).toFixed(2);
  document.getElementById('custom-price').textContent = isNaN(customAmount) ? '0.00' : price;
}

async function triggerPayment() {
  const amount = parseFloat(document.getElementById('custom-price').textContent);
  if (isNaN(amount) || amount <= 0) {
    alert('Please select a valid amount.');
    return;
  }

  const response = await fetch('http://localhost:5000/create-checkout-session', {  // ❌ THIS LINE
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  });

  const session = await response.json();
  const stripe = Stripe('pk_test_51RCN4OPRHC7jcWnUpBPFBn5qwZBeepmXBEpz1MBDU3Q5kSATAKAtx5Yu04huzk1TTlGFRcrkmbNcJky7u9DhlzmI00MlQAplBZ');
  stripe.redirectToCheckout({ sessionId: session.id });
}
