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

  try {
    // ✅ Use Netlify serverless function path
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const session = await response.json();

    if (!session.id) {
      throw new Error('Invalid session response');
    }

    const stripe = Stripe('pk_test_51RCN4OPRHC7jcWnUpBPFBn5qwZBeepmXBEpz1MBDU3Q5kSATAKAtx5Yu04huzk1TTlGFRcrkmbNcJky7u9DhlzmI00MlQAplBZ');
    stripe.redirectToCheckout({ sessionId: session.id });

  } catch (error) {
    console.error('Payment error:', error);
    alert('Failed to initiate payment. Please try again later.');
  }
}

function openSection(section) {
  const sections = document.querySelectorAll('.details-section');
  sections.forEach(sec => sec.style.display = 'none');
  document.getElementById(`${section}-section`).style.display = 'block';
}

function updateTurtlePrice() {
  const count = parseInt(document.getElementById('turtle-count').value);
  const price = (count * 1.12).toFixed(2);
  document.getElementById('turtle-price').textContent = price;
}

window.onload = () => {
  document.getElementById('currency-section').style.display = 'block';
};
